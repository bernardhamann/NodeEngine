var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongooseRest = require('./mongoose-rest');

var peopleSchema = {
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    createdAt:{type: String, required: true}
};

var Model = mongoose.model(
    'People',
    peopleSchema,
    'people');


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

    var obj = req.body;
    obj.createdAt = new Date();

    mongooseRest.post(req, res, Model, obj);

});



router.get('/:field1/:value1', function (req, res){

    var field1 = req.params.field1;
    var value1 = req.params.value1;
    var query1 = {};
    query1[field1] = value1;


    Model
        .find(
            query1
        )
        .sort(
            { _id: 1 }
        )
        .skip(
            req.query.limit * req.query.batch
        )
        .limit(
            req.query.limit
        )
        .exec(function (err, doc){

            res.send(doc);
    })

});





module.exports = router;