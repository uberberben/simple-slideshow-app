const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to fetch image list
app.get('/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read images directory' });
        }
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        res.json(images);
    });
});

// Endpoint to fetch timeout value
app.get('/timeout', (req, res) => {
    const timeout = process.env.TIMEOUT || 3000; // Default to 3000ms if not set
    res.json({ timeout: parseInt(timeout, 10) });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});