//var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var neData = require('ne-data');

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

module.exports = function (router){

    var permissionsArray = ['reader'];

    neData.get(router, Model);
    neData.putWithPermissions(router, Model, permissionsArray);
    neData.postWithPermissions(router, Model, permissionsArray);
    neData.deleteWithPermissions(router, Model, permissionsArray);

};