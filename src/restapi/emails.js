var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongooseRest = require('./ne-rest-mongoose');

var emailsSchema = {
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    createdAt:{type: String, required: true}
};

var Model = mongoose.model(
    'Emails',
    emailsSchema,
    'emails');

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

router.post('/', function (req, res){

    var obj = req.body;
    obj.createdAt = new Date();

    mongooseRest.post(req, res, Model, obj);

});

module.exports = router;