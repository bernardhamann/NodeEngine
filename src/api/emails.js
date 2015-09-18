var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseRest = require('ne-rest-mongoose');

var emailsSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    user:{type: Schema.ObjectId},
    createdAt:{type: String, required: true}
});

var Model = mongoose.model(
    // Name of the model
    'Emails',
    // Schema of the model
    emailsSchema,
    // ?? Collection name
    'emails');


mongooseRest.init(router, Model);

module.exports = router;