var stringify = require ('stringify-object');
var appmeta = require ('./appmeta');
var _ = require('lodash');

var obj = {
    foo: 'bar',
    'arr': [1, 2, 3],
    nested: { hello: "world" },
    ff: function(){
        console.log("This")
    }
};

var pretty = stringify(obj, {
    indent: '  ',
    singleQuotes: false
});

var path = "/people";

var meta = _.find(appmeta, { path: path });

var ff = meta.nedb1.func();

//console.log(meta);
console.log('meta.nedb1.func()');
console.log(ff);
console.log('meta.nedb1.func()');