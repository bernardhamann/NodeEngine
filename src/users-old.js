var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoRest = require('ne-mongo-rest');

var modelSchema = new Schema({
    local: {
        username: String,
        password: String
    },
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    createdAt:{type: String, required: true, default: new Date()}
});

var Model = mongoose.model(
    'users',
    modelSchema
);

mongoRest.model(router, Model);

module.exports = router;