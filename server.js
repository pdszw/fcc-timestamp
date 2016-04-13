'use strict';

// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./app/routes/index.js');
var api = require('./app/api/timestamp.js');

app.use('/public', express.static(process.cwd() + '/public'));

routes(app);
api(app);

app.listen(process.env.PORT || 8080);