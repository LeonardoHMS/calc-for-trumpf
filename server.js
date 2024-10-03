const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const hostname = '192.168.100.16';
const port = 3000;

// Static Files
app.use(express.static('public'));

app.get('embed/:file', (req, res) => {
    const filename = req.params.file;
    res.sendFile(path.join(__dirname, 'public', filename));
});

app.listen(port, () => {
    console.log(`servidor rodando em http://${hostname}:${port}/index.html`);
})