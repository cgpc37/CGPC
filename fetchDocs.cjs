const fs = require('fs');
const path = require('path');
const https = require('https');

// The token should be provided via environment variable (e.g. VITE_NOTION_TOKEN)
const token = process.env.VITE_NOTION_TOKEN || "PLACEHOLDER"; 
const databaseId = "331a17b5-97bf-81a2-9250-000bc4f9d443";

async function downloadFile(url, localPath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // handle redirect
                return downloadFile(response.headers.location, localPath).then(resolve).catch(reject);
            }
            if (response.statusCode === 200) {
                const file = fs.createWriteStream(localPath);
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(new Error(`Failed to download file: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function fetchDocs() {
    console.log("Fetching from Notion database:", databaseId);
    
    // Ensure directories exist in public folder
    const publicDir = path.join(__dirname, 'public', 'assets');
    const imgDir = path.join(publicDir, 'docs_images');
    const fileDir = path.join(publicDir, 'docs_files');
    
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
    if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });

    let res;
    try {
        res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        });
    } catch(e) {
        console.error("Network error:", e);
        return;
    }
    
    if (!res.ok) {
        console.error("Failed to query DB:", await res.text());
        return;
    }
    
    const data = await res.json();
    const documents = [];
    
    // Sort logic happens in Notion or we can do it later. We just parse the properties.
    for (const page of data.results) {
        let titleProp = page.properties['Nombre'];
        const title = titleProp?.title?.[0]?.plain_text || 'Untitled';
        
        const catProp = page.properties['Categoría'];
        const category = catProp?.select?.name || 'Uncategorized';
        
        const stateProp = page.properties['Estado'];
        const state = stateProp?.select?.name || 'Draft';
        
        const pubDate = page.created_time || ''; // We can use created_time as a fallback for publication date
        
        const urlProp = page.properties['Descarga'];
        const downloadUrl = urlProp?.url || '';

        // Extract Portada
        const coverProp = page.properties['Portada'];
        let coverImageRemote = null;
        if (coverProp?.files?.length > 0) {
            coverImageRemote = coverProp.files[0].file?.url || coverProp.files[0].external?.url;
        }

        let localImageRelative = null;
        if (coverImageRemote) {
            const ext = coverImageRemote.split('?')[0].split('.').pop() || 'png';
            const fileName = `${page.id}_cover.${ext}`;
            const localPath = path.join(imgDir, fileName);
            try {
                console.log(`Downloading cover for ${title}...`);
                await downloadFile(coverImageRemote, localPath);
                localImageRelative = `/CGPC/assets/docs_images/${fileName}`; // Keep matching base path logic
            } catch (err) {
                console.error(`Failed to download cover for ${title}:`, err.message);
            }
        }

        // Extract Archivo (if present)
        const fileProp = page.properties['Archivo'];
        let fileRemote = null;
        if (fileProp?.files?.length > 0) {
            fileRemote = fileProp.files[0].file?.url || fileProp.files[0].external?.url;
        }

        let localFileRelative = null;
        if (fileRemote) {
            const ext = fileRemote.split('?')[0].split('.').pop() || 'pdf';
            const fileName = `${page.id}_file.${ext}`;
            const localPath = path.join(fileDir, fileName);
            try {
                console.log(`Downloading file for ${title}...`);
                await downloadFile(fileRemote, localPath);
                localFileRelative = `/CGPC/assets/docs_files/${fileName}`;
            } catch (err) {
                console.error(`Failed to download file for ${title}:`, err.message);
            }
        }
        
        documents.push({
            id: page.id,
            title,
            category,
            state,
            date: pubDate,
            downloadUrl,
            coverImage: localImageRelative,
            fileUrl: localFileRelative
        });
    }
    
    // Sort by publication date / created time descending
    documents.sort((a,b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync('./src/assets/docsData.json', JSON.stringify(documents, null, 2));
    console.log("Saved docsData.json with", documents.length, "documents.");
}

fetchDocs().catch(console.error);
