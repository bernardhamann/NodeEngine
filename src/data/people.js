var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var neData = require('ne-data');

var modelSchema = new Schema({
    nameFirst:{type: String, required: true},
    nameLast:{type: String, required: false},
    email:{type: String, required: false},
    category:{type: String, required: true, default: "undefined"},
    bio:{type: String, required: false, default: "No bio provided"},
    second:{
        level: {type: String, required: false}
    },
    createdAt:{type: String, required: true, default: new Date()}
});

/*
var dataRefOld = {
    "name": "people",
    "slug": "/admin/people",
    "apiSlug": "/data/people",
    "interfaceType": "default",
    "cycleByDefault": false,
    "batchSize": 10,
    "categories": ["undefined", "family", "friends"],
    "tags": [],
    "fields": ["nameFirst", "nameLast", "email", "second.level"]
};
*/

// todo consider putting the dataRef and modelSchema is separate files can can easily be edited using fs if the user wants to update them. This can get complicated. Maybe another approach can be used where the dataRef and modelSchema is stored in the database and loaded only once when the app starts or something like that

// The key names in the dataRef is required to be used as is because ne-admin looks for those key names
// templateRef is for when this data is used in a template what expects certain input

var dataRef = {
    "name": "people",
    "slug": "/admin/people",
    "apiSlug": "/data/people",
    "interfaceType": "default",
    "cycleByDefault": false,
    "batchSize": 10,
    "categories": ["undefined", "family", "friends"],
    "tags": [],
    "fields": [
        {
            data: "nameFirst",
            label: "First Name",
            templateRef: "string1"
        },
        {
            data: "nameLast",
            label: "Last Name",
            templateRef: "string2"
        },
        {
            data: "email",
            label: "Email",
            templateRef: "string3"

        },
        {
            data: "second.level",
            label: "Second Level",
            templateRef: "string4"

        },
        {
            data: "category",
            label: "Category",
            editType: "select",
            selectOptions: ["friends", "family"],
            templateRef: "string5"
        },
        {
            label: "Bio",
            data: "bio",
            editType: "textarea",
            templateRef: "string6"
        }
    ]
};

var Model = mongoose.model(
    'people',
    modelSchema,
    'people'
);

var routes = function (router, passport, strategyName){

    var permissionsArray = ['reader', 'admin'];

    neData.get(router, Model);
    neData.putWithPermissions(router, Model, permissionsArray);
    neData.postWithPermissions(router, Model, permissionsArray);
    neData.deleteWithPermissions(router, Model, permissionsArray);

};

exports.routes = routes;
exports.dataRef = dataRef;
