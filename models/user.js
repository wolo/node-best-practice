'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(url) {

    var close = function() {};

    var withCollection = function(fn) {
        var options = { db: { native_parser: true } };
        MongoClient.connect(url, options, function(err, db){
            if(err) throw err;

            close = function() {
                db.close();
            }

            fn(db.collection("users"));

        });
    }

    return {
        getAll: function(callback) {
            withCollection(function(collection){
                collection.find({}).toArray(callback);
            });
        },
        get: function(userId, callback) {
            withCollection(function(collection){
                collection.findOne({ "_id": ObjectID(userId) }, callback);
            });
        },
        add: function(userData, callback) {
            withCollection(function(collection){
                collection.insert(userData, callback);
            });
        },
        delete: function(userId, callback) {
            withCollection(function(collection){
                collection.remove({_id: ObjectID(userId)}, callback);
            });
        },
        clean: function(callback) {
            withCollection(function(collection){
                collection.remove({}, callback);
            });
        },
        close: function() {
            close();
        }
    };
};
