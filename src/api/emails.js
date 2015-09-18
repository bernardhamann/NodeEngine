var router = require('express').Router();
var mongoose = require('mongoose');
var mongooseRest = require('ne-rest-mongoose');

var emailsSchema = {
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    createdAt:{type: String, required: true}
};

var Model = mongoose.model(
    'Emails',
    emailsSchema,
    'emails');


mongooseRest.init(router, Model);

module.exports = router;