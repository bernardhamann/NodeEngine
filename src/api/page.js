var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseRest = require('ne-rest-mongoose');

var pageSchema = new Schema({
    path:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true},
    pd:{
        pdNumber:{type: Number, required: false, default: '0'},
        pd1:{
            path: {type: String, required: false}
        }
    },
    createdAt:{type: String, required: true}

});

var Model = mongoose.model(
    'Page',
    pageSchema,
    'page');


mongooseRest.init(router, Model);


module.exports = router;