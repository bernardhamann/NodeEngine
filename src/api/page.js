//var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var neData = require('ne-data');

var modelSchema = new Schema({
    path:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true},
    createdAt:{type: String, required: true, default: new Date()}

});

var dataRef = {
    "name": "page",
    "slug": "/admin/page",
    "apiSlug": "/api/page",
    "interfaceType": "default",
    "cycleByDefault": false,
    "batchSize": 10,
    "categories": [],
    "tags": [],
    "fields": ["path", "title", "description"]
};


var Model = mongoose.model(
    'page',
    modelSchema,
    'page'
);


var routes = function (router, passport, strategyName){

    var permissionsArray = ['reader'];

    neData.get(router, Model);
    neData.putWithPermissions(router, Model, permissionsArray);
    neData.postWithPermissions(router, Model, permissionsArray);
    neData.deleteWithPermissions(router, Model, permissionsArray);

};

exports.routes = routes;
exports.dataRef = dataRef;
