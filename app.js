const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.static('./dist'));

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;
