//var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoRest = require('ne-mongo');

var modelSchema = new Schema({
    nameFirst:{type: String, required: true},
    nameLast:{type: String, required: false},
    email:{type: String, required: false},
    createdAt:{type: String, required: true, default: new Date()}
});

var Model = mongoose.model(
    'people',
    modelSchema,
    'people'
    );


module.exports = function (router, passport, strategyName){

    var permissionsArray = ['reader'];

    //mongoRest.get(router, Model);
    mongoRest.getWithPermissions(router, Model, permissionsArray);
    mongoRest.putWithPermissions(router, Model, permissionsArray);
    mongoRest.postWithPermissions(router, Model, permissionsArray);
    mongoRest.deleteWithPermissions(router, Model, permissionsArray);

};