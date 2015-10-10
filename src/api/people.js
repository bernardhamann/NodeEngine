//var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var neData = require('ne-data');

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
    neData.getWithPermissions(router, Model, permissionsArray);
    neData.putWithPermissions(router, Model, permissionsArray);
    neData.postWithPermissions(router, Model, permissionsArray);
    neData.deleteWithPermissions(router, Model, permissionsArray);

};