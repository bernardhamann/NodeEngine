var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restMongoose = require('ne-rest-mongoose');

var peopleSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    createdAt:{type: String, required: true, default: new Date()}
});

var Model = mongoose.model(
    'people',
    peopleSchema,
    'people');

restMongoose.model(router, Model);

module.exports = router;