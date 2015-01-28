'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

module.exports = function(url) {

    var close = function() {};

    var withCollection = function(callback) {
        var options = { db: { native_parser: true } };
        MongoClient.connect(url, options, function(err, db){
            if(err)
                callback(err);
            else {
                close = function() {
                    db.close();
                }

                callback(null, db.collection("users"));
            }
        });
    }

    return {
        getAll: function(callback) {
            withCollection(function(err, collection){
                if(err)
                    callback(err);
                else
                    collection.find({}).toArray(callback);
            });
        },
        get: function(userId, callback) {
            withCollection(function(err, collection){
                if(err)
                    callback(err);
                else
                    collection.findOne({ "_id": ObjectID(userId) }, callback);
            });
        },
        add: function(userData, callback) {
            withCollection(function(err, collection){
                if(err)
                    callback(err);
                else
                    collection.insert(userData, callback);
            });
        },
        delete: function(userId, callback) {
            withCollection(function(err, collection){
                if(err)
                    callback(err);
                else
                    collection.remove({_id: ObjectID(userId)}, callback);
            });
        },
        clean: function(callback) {
            withCollection(function(err, collection){
                if(err)
                    callback(err);
                else
                    collection.remove({}, callback);
            });
        },
        close: function() {
            close();
        }
    };
};
