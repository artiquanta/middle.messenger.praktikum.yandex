const express = require('express');

require('dotenv').config();

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.use('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

module.exports = app;
