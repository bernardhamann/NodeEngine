var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restMongoose = require('ne-rest-mongoose');

var emailsSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    user:{type: Schema.ObjectId},
    createdAt:{type: String, required: true}
});

var Model = mongoose.model(
    // Name of the model
    'emails',
    // Schema of the model
    emailsSchema,
    // ?? Collection name
    'emails');


restMongoose.model(router, Model);

module.exports = router;