var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var pageSchema = {
    path:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true}
};

var Page = mongoose.model(
    'Page',
    pageSchema,
    'page');


router.get('/', function (req, res){

    var field1 = 'path';
    var value1 = req.query.path;
    var query1 = {};
    query1[field1] = value1;

    if (value1 != null){
        Page
            .findOne(
            query1
            )
            .exec(function (err, doc){
                res.send(doc);
            })
    }
    else {
        Page
            .find(
            )
            .exec(function (err, doc){
                res.send(doc);
            })
    }
});


router.post('/', function (req, res){

    var obj = {};
    obj.path = req.body.path;
    obj.title = req.body.title;
    obj.description = req.body.description;

    var newDoc = new Page(obj);
    newDoc.save(function (err, newDoc){
        if (err) return console.error(err);
        res.send(newDoc)
    })

});

router.put('/path', function (req, res){

    var field1 = 'path';
    var value1 = req.query.old;
    var query1 = {};
    query1[field1] = value1;

    var field2 = 'path';
    var value2 = req.query.new;
    var set1 = {};
    set1[field2] = value2;


    Page
        .update(
        query1,
        {$set: set1}
    )
        .exec(function (err, doc){
            res.send(doc);
        })


});


router.put('/title', function (req, res){

    var field1 = 'path';
    var value1 = req.query.path;
    var query1 = {};
    query1[field1] = value1;

    var field2 = 'title';
    var value2 = req.body.title;
    var set1 = {};
    set1[field2] = value2;


    Page
        .update(
        query1,
        {$set: set1}
    )
        .exec(function (err, doc){
            res.send(doc);
        })
});


router.put('/description', function (req, res){

    var field1 = 'path';
    var value1 = req.query.path;
    var query1 = {};
    query1[field1] = value1;

    var field2 = 'description';
    var value2 = req.body.description;
    var set1 = {};
    set1[field2] = value2;


    Page
        .update(
        query1,
        {$set: set1}
    )
        .exec(function (err, doc){
            res.send(doc);
        })
});

router.delete('/', function (req, res){

    var field1 = 'path';
    var value1 = req.query.path;
    var query1 = {};
    query1[field1] = value1;

    Page
        .remove(
        query1
    )
        .exec(function (err, doc){
            if (err) return console.error(err);
            res.send(value1 + ' removed' + doc)
        })

});


module.exports = router;