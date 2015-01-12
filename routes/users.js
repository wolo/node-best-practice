'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    var db = req.db;
    db.collection('users').find({}).toArray(function (err, items) {
        res.json(items);
    });
});

/* add a user */
router.post('/', function (req, res) {
    var db = req.db;
    db.collection('users').insert(req.body, function (err, result) {
        res.send((err === null) ? {
            msg: 'ok'
        } : {
            msg: err
        });
    });
});

/* delete a user */
router.delete('/:id', function (req, res) {
    var db = req.db;
    var userId = req.params.id;
    db.collection('users').removeById(userId, function (err, result) {
        res.send((result === 1) ? {
            msg: 'ok'
        } : {
            msg: err
        });
    });
});
