const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/assets/All Images');
const outputFile = path.join(__dirname, '../public/assets/gallery-data.json');

// Ensure the directory exists
if (!fs.existsSync(imagesDir)) {
    console.error(`Error: Directory not found: ${imagesDir}`);
    process.exit(1);
}

// Read directory
fs.readdir(imagesDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        process.exit(1);
    }

    // Filter for image files (extensions can be added here)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const images = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
    });

    // Create JSON structure
    const galleryData = {
        images: images,
        generatedAt: new Date().toISOString(),
        count: images.length
    };

    // Write to file
    fs.writeFile(outputFile, JSON.stringify(galleryData, null, 2), (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            process.exit(1);
        }
        console.log(`Successfully generated gallery-data.json with ${images.length} images.`);
    });
});
