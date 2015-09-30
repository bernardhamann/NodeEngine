//var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoRest = require('ne-mongo');

var modelSchema = new Schema({
    path:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true},
    pd:{
        pdNumber:{type: Number, required: false, default: '0'},
        pd1:{
            path: {type: String, required: false}
        }
    },
    createdAt:{type: String, required: true, default: new Date()}

});

var Model = mongoose.model(
    'page',
    modelSchema,
    'page'
    );


module.exports = function (router, passport, strategyName){

    mongoRest.get(router, Model);
    mongoRest.putWithPassport(router, Model, passport, strategyName);
    mongoRest.postWithPassport(router, Model, passport, strategyName);
    mongoRest.deleteWithPassport(router, Model, passport, strategyName);

};