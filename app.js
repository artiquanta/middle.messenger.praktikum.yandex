const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', express.static(__dirname + '/dist'));

module.exports = app;
