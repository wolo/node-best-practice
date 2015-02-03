'use strict';
var express = require('express');

function returnResult(model, res, err, data, next) {
    model.close();
    if(err)
        next(err);
    else
        res.json(data);
}

module.exports = {
    // GET users listing
    "get": {
        "/": function (req, res, next) {
            req.model.getAll(function (err, items) {
                returnResult(req.model, res, err, items, next);
            });
        },
        "/:id": function (req, res, next) {
            req.model.get(req.params.id, function (err, item) {
                returnResult(req.model, res, err, item, next);
            });
        }
    },
    // add a user
    "post": {
        "/": function (req, res, next) {
            req.model.add(req.body, function (err, result) {
                returnResult(req.model, res, err, { msg: 'ok' }, next);
            });
        }
    },
    // delete a user
    "delete": {
        "/:id": function (req, res, next) {
            var userId = req.params.id;
            req.model.delete(userId, function (err, result) {
                returnResult(req.model, res, err, { msg: 'ok' }, next);
            });
        }
    }
};
