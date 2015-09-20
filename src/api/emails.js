var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoRest = require('ne-mongo-rest');

var modelSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    user:{type: Schema.ObjectId},
    createdAt:{type: String, required: true}
});

var Model = mongoose.model(
    'emails',
    modelSchema
    );


mongoRest.model(router, Model);

module.exports = router;