'use strict';
var express = require('express');
var resource = require('../resources/users');
var router = express.Router();

Object.getOwnPropertyNames(resource).forEach(function(method){
    var oMethod = resource[method];
    Object.getOwnPropertyNames(oMethod).forEach(function(path){
        router[method](path, oMethod[path]);
    });
});

module.exports = router;
