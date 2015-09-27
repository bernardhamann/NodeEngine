//var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoRest = require('ne-mongo-rest');

var modelSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    createdAt:{type: String, required: true, default: new Date()}
});

var Model = mongoose.model(
    'people',
    modelSchema,
    'people'
    );


module.exports = function (router, passport, strategyName){

    mongoRest.get(router, Model);
    mongoRest.put(router, Model);
    mongoRest.postWithPassport(router, Model, passport, strategyName);
    mongoRest.deleteWithPassport(router, Model, passport, strategyName);

};