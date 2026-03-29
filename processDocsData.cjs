const fs = require('fs');
const path = require('path');
const https = require('https');

const outputTxt = fs.readFileSync('C:\\Users\\chris\\.gemini\\antigravity\\brain\\c2bd3208-68d6-43bc-8f02-fb574e887f8f\\.system_generated\\steps\\70\\output.txt', 'utf-8');
const data = JSON.parse(outputTxt);

async function downloadFile(url, localPath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
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

async function processDocs() {
    const publicDir = path.join(__dirname, 'public', 'assets');
    const imgDir = path.join(publicDir, 'docs_images');
    const fileDir = path.join(publicDir, 'docs_files');
    
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
    if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });

    const documents = [];
    
    for (const page of data.results) {
        if (page.object !== 'page') continue;

        let titleProp = page.properties['Nombre'];
        const title = titleProp?.title?.[0]?.plain_text || 'Untitled';
        
        const catProp = page.properties['Categoría'];
        const category = catProp?.select?.name || 'Uncategorized';
        
        const stateProp = page.properties['Estado'];
        const state = stateProp?.select?.name || 'Draft';
        
        const pubDate = page.created_time || '';
        
        const urlProp = page.properties['Descarga'];
        const downloadUrl = urlProp?.url || '';

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
                localImageRelative = `/CGPC/assets/docs_images/${fileName}`;
            } catch (err) {
                console.error(`Failed to download cover for ${title}:`, err.message);
            }
        }

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
        } else if (title.includes('Revista 37Bits')) {
             // Link to the local revista pdf
             localFileRelative = '/CGPC/assets/docs_files/Magazine_37Bits_Edicion_1_Standard_compressed.pdf';
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
    
    documents.sort((a,b) => new Date(a.date) - new Date(b.date)); // Sort ascending for this display or descending.

    fs.writeFileSync('./src/assets/docsData.json', JSON.stringify(documents, null, 2));
    console.log("Saved docsData.json with", documents.length, "documents.");
}

processDocs().catch(console.error);
