var fs = require("fs");
var path = require('path');

var express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');
var passport = require ('passport');

var neAuth = require ('ne-auth');
var neData = require('ne-data');
var neServer = require('ne-server');
var neRender = require('ne-render');

var serverInit = require('./serverInit');

var port = process.env.PORT;

var serverConfig = function(dirName, optionsObject){

    console.log('');
    console.log('');
    console.log('neAuto serverConfig: optionsObject');
    console.log(optionsObject);
    console.log('');
    console.log('');

    var neCompilePath = ("../../../node_engine/ne-gulp/");
    if (optionsObject.neCompilePath){

        neCompilePath = optionsObject.neCompilePath;

        console.log('');
        console.log('');
        console.log('neAuto serverConfig: neCompilePath');
        console.log(neCompilePath);
        console.log('');
        console.log('');

    }

    var neCompilePathForAppMeta = neCompilePath + 'appmeta';
    var appMeta = require(neCompilePathForAppMeta);
    var neCompilePathForRoutes = neCompilePath + 'routes';
    var routes = require(neCompilePathForRoutes);
    var neCompilePathForDataRef = neCompilePath + 'dataRef';
    var dataRef = require(neCompilePathForDataRef);

    var server = serverInit(port);

    ////////////////////////
    // Support
    ////////////////////////

    server.use(bodyParser.json());
    server.use(bodyParser.raw());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.text());

    // Parse the cookies in the headers and set it as the req.cookies variable
    server.use(cookieParser());

    ////////////////////////
    // Logging
    ////////////////////////

    // Logs every transaction to the console
    server.use(morgan('dev'));

    //////////////////////
    // Static Assets
    //////////////////////

    var cacheTime = optionsObject.cacheTime;

    console.log('');
    console.log('');
    console.log('neAuto serverConfig: cacheTime');
    console.log(cacheTime);
    console.log('');
    console.log('');

    neServer.static(server, dirName, cacheTime);

    ///////////////
    // Database
    ///////////////

    mongoose.connect(process.env.MONGO_URL);

    ///////////////
    // Authentication
    ///////////////

    // Configure additional passport here strategies before init
    neAuth.config(passport);

    // Initialize passport
    neAuth.init(server, passport);

    // Setup the routes
    neAuth.routes(server, passport, optionsObject);
    // If usersDetail is set to true you must define a user details models with the name of 'neuserdetail'
    // If insecure is set to true then all users can edit users
    // Now you can use passport configure additional routes here

    ///////////////
    // Data
    ///////////////

    neData.routesConfig(server, dirName);

    //////////////////////
    // Routes
    //////////////////////

    // Must be after auth
    neServer.routes(server, dirName, optionsObject);

    ////////////////////////////////////////////////////////////
    // Rendering React with React-Router on the server with Pre-Render Data from API's
    ////////////////////////////////////////////////////////////

    neRender.serverRender(server, appMeta, routes, dataRef);

    ////////////////////////////////////////////////////////////
    // ne-auth custom error handling
    ////////////////////////////////////////////////////////////

    server.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.redirect('/login?message=AccessDenied:InsufficientPermissions').status(401);
        }
    });
};

module.exports =  serverConfig;