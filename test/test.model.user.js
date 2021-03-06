var http = require('http');
var should = require("chai").should();
var userModel = require("../models/user");

var mongoUrl = process.env.MONGO_TEST_URL;
if(!mongoUrl)
    throw new Error("Missing environment MONGO_TEST_URL");

var model = userModel(mongoUrl);

var userData = {
    'username': "ttester",
    'email': "tester@test.com",
    'fullname': "Toni Tester",
    'age': 55,
    'location': "Testhausen",
    'gender': "none"
};

function cmpData(actual, expected) {
    var propertyNames = Object.getOwnPropertyNames(expected);
    Object.getOwnPropertyNames(actual).length.should.equal(propertyNames.length);

    propertyNames.forEach(function(key){
        if(key != "_id")
            actual[key].should.equal(expected[key]);
    });
}

describe("User model", function(){
    describe("CRUD", function(){
        it("should return all users", function(done){
            model.clean(function(err, result){
                if(err) throw err;

                console.log("add");

                model.add(userData, function(err) {
                    if(err) throw err;

                    model.getAll(function(err, docs){
                        if(err) throw err;

                        docs.length.should.equal(1);
                        var doc = docs[0];
                        cmpData(doc, userData);

                        model.get(doc._id, function(err, doc){
                            if(err) throw err;

                            cmpData(doc, userData);

                            model.delete(docs[0]._id, function(err) {
                                if(err) throw err;

                                model.getAll(function(err, docs){
                                    if(err) throw err;

                                    docs.length.should.equal(0);
                                    model.close();
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
