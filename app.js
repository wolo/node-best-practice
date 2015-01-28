/*jslint nomen: true */
'use strict';
// log file
var log = require('./log');
log.info("app started");

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var userModel = require("./models/user");
var mongo_url = "mongodb://localhost:27017/mongo_rest";

var routes = require('./routes/index');
var users = require('./routes/users');
var fs = require('fs');
var path = require('path');

var app = express();

// configure the access log file
var logDir = path.join(__dirname, 'log');
if(!fs.existsSync(logDir))
    fs.mkdirSync(logDir);
var accessLogStream = fs.createWriteStream(path.join(logDir, '/access.log'), {flags: 'a'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function (req, res, next) {
    req.model = userModel(mongo_url);
    next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(morgan('dev')); // log requests to console
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        log.error(err.stack);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    log.error(err.stack);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(morgan('combined', {stream: accessLogStream}))

module.exports = app;
