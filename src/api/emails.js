//var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoRest = require('ne-mongo');

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

module.exports = function (router, passport, strategyName){

    var permissionsArray = ['reader'];

    mongoRest.get(router, Model);
    mongoRest.putWithPermissions(router, Model, permissionsArray);
    mongoRest.postWithPermissions(router, Model, permissionsArray);
    mongoRest.deleteWithPermissions(router, Model, permissionsArray);

};