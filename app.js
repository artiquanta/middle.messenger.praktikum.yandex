const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist'));

app.use('/*', (req, res) => {
  res.set({
    'Content-Security-Policy': "default-src 'self'; connect-src 'self' https://ya-praktikum.tech/ wss://ya-praktikum.tech/; img-src 'self' https://ya-praktikum.tech/; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval'",
  });
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;
