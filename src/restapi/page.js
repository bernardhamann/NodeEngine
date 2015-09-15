var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongooseRest = require('./mongoose-rest');

var pageSchema = {
    path:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true},
    createdAt:{type: String, required: true}
};

var Model = mongoose.model(
    'Page',
    pageSchema,
    'page');


router.get('/', function (req, res){

    mongooseRest.get(req, res, Model);

});

router.get('/:_id', function (req, res){

    mongooseRest.getById(req, res, Model);

});

router.delete('/', function (req, res){

    mongooseRest.delete(req, res, Model);

});

router.delete('/:_id', function (req, res){

    mongooseRest.deleteById(req, res, Model);

});

router.put('/', function (req, res){

    mongooseRest.put(req, res, Model);

});

router.put('/:_id', function (req, res){

    mongooseRest.putById(req, res, Model);

});

router.post('/', function (req, res){

    var obj = {};
    obj.path = req.body.path;
    obj.title = req.body.title;
    obj.description = req.body.description;
    obj.createdAt = new Date();

    mongooseRest.post(req, res, Model, obj);

});


module.exports = router;