const http = require('http');
const fs = require('fs');
const path = require('path');
const { send, notFound } = require('./response');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const staticServer = http.createServer((req, res) => {
  let filePath = req.url === '/'
    ? path.join(PUBLIC_DIR, 'index.html')
    : path.join(PUBLIC_DIR, req.url);

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      return notFound(res, 'Static file not found');
    }

    send(res, 200, content, contentType);
  });
});

module.exports = staticServer;
