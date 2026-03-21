const fs = require('fs');
const path = require('path');
const https = require('https');

// The token should be provided via environment variable (e.g. VITE_NOTION_TOKEN)
// This script is used locally to refresh the blog data.
const token = process.env.VITE_NOTION_TOKEN || "PLACEHOLDER"; 
const databaseId = "328a17b5-97bf-8105-9a58-fb9d1c9f4e8d";

async function downloadImage(url, localPath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                const file = fs.createWriteStream(localPath);
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(new Error(`Failed to download image: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function fetchBlog() {
    console.log("Fetching from Notion database:", databaseId);
    
    // Ensure directory exists
    const imgDir = path.join(__dirname, 'src', 'assets', 'blog_images');
    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
    }

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
    const articles = [];
    
    for (const page of data.results) {
        let titleProp = page.properties['Nombre'];
        if (!titleProp) {
            const propKeys = Object.keys(page.properties);
            const titleKey = propKeys.find(k => page.properties[k].type === 'title');
            if (titleKey) titleProp = page.properties[titleKey];
        }

        const title = titleProp?.title?.[0]?.plain_text || 'Untitled';
        const catProp = page.properties['Categoría'];
        const category = catProp?.select?.name || 'Uncategorized';
        const stateProp = page.properties['Estado'];
        const state = stateProp?.select?.name || 'Draft';
        
        console.log("Fetching blocks for:", title);
        const blocksRes = await fetch(`https://api.notion.com/v1/blocks/${page.id}/children?page_size=50`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Notion-Version': '2022-06-28'
            }
        });
        
        let contentPreview = "";
        let coverImageRemote = null;
        let localImageRelative = null;

        if (blocksRes.ok) {
            const blocksData = await blocksRes.json();
            if (blocksData.results) {
                for (const b of blocksData.results) {
                    if (b.type === 'image' && !coverImageRemote) {
                        coverImageRemote = b.image.file?.url || b.image.external?.url;
                    }
                    if (b.type === 'paragraph' && b.paragraph.rich_text.length > 0) {
                        contentPreview += b.paragraph.rich_text.map(rt => rt.plain_text).join('') + "\n\n";
                    }
                }
            }
        }

        if (coverImageRemote) {
            const ext = coverImageRemote.split('?')[0].split('.').pop() || 'png';
            const fileName = `${page.id}.${ext}`;
            const localPath = path.join(imgDir, fileName);
            try {
                console.log(`Downloading image for ${title}...`);
                await downloadImage(coverImageRemote, localPath);
                localImageRelative = `/CGPC/src/assets/blog_images/${fileName}`;
            } catch (err) {
                console.error(`Failed to download image for ${title}:`, err.message);
            }
        }
        
        articles.push({
            id: page.id,
            title,
            category,
            state,
            content: contentPreview,
            targetImage: localImageRelative
        });
    }
    
    fs.writeFileSync('./src/assets/blogData.json', JSON.stringify(articles, null, 2));
    console.log("Saved blogData.json with", articles.length, "articles.");
}

fetchBlog().catch(console.error);
