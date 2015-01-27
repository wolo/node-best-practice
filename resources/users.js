'use strict';
var express = require('express');

function returnResult(model, res, err, data) {
    model.close();
    if(err) throw err;
    res.json(data);
}

module.exports = {
    // GET users listing
    "get": {
        "/": function (req, res) {
            req.model.getAll(function (err, items) {
                returnResult(req.model, res, err, items);
            });
        },
        "/:id": function (req, res) {
            req.model.get(req.params.id, function (err, item) {
                returnResult(req.model, res, err, item);
            });
        }
    },
    // add a user
    "post": {
        "/": function (req, res) {
            req.model.add(req.body, function (err, result) {
                req.model.close();
                if(err) throw err;

                res.json({ msg: 'ok' });
            });
        }
    },
    // delete a user
    "delete": {
        "/:id": function (req, res) {
            var userId = req.params.id;
            req.model.delete(userId, function (err, result) {
                req.model.close();
                if(err) throw err;

                res.json({ msg: 'ok' });
            });
        }
    }
};
