var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var peopleSchema = {
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true}
};

var People = mongoose.model(
    'People',
    peopleSchema,
    'people');


router.get('/:field1/:value1', function (req, res){

    var field1 = req.params.field1;
    var value1 = req.params.value1;
    var query1 = {};
    query1[field1] = value1;


    People
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

router.get('/', function (req, res){

    People
        .find(
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


router.post('/', function (req, res){

    var obj = {};
    obj.firstName = req.body.firstName;
    obj.lastName = req.body.lastName;
    obj.email = req.body.email;

    var newDoc = new People(obj);
    newDoc.save(function (err, newDoc){
        if (err) return console.error(err);
        res.send(newDoc)
    })

});

router.put('/:field1/:value1/:field2/:value2', function (req, res){

    var field1 = req.params.field1;
    var value1 = req.params.value1;
    var query1 = {};
    query1[field1] = value1;

    var field2 = req.params.field2;
    var value2 = req.params.value2;
    var set1 = {};
    set1[field2] = value2;


    People
        .update(
        query1,
        {$set: set1}
        )
        .exec(function (err, doc){
            res.send(doc);
        })


});

router.delete('/:field1/:value1', function (req, res){

    var field1 = req.params.field1;
    var value1 = req.params.value1;
    var query1 = {};
    query1[field1] = value1;

    People
        .remove(
            query1
        )
        .exec(function (err, doc){
            if (err) return console.error(err);
            res.send(value1 + ' removed' + doc)
        })

});


module.exports = router;