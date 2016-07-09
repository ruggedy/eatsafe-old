/// <reference path="../../typings/index.d.ts"/>

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');

var port = process.env.PORT || 3000;

var appRoutes = require('./routes/app');
var restaurantRoutes = require('./routes/restaurants');
var userRoutes = require('./routes/users');

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/e-commerce');

// view engine setup
app.set('views', path.join('dist', 'dev'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, X-Requested-With')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/', appRoutes);

app.listen(port, function(err) {
    console.log('Running server on Port ' + port);
});



