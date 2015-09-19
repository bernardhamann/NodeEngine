#!/usr/bin/env node

var express = require('express');
var path = require('path');

var nodeEngineServer = require('ne-server');
var neRender = require('ne-render');
var mongoRest = require('ne-mongo-rest');

var configDevelopment = require('../config/config.json');
var configProduction = require('../config/pm2.json');
var globals = require('../config/globals.json');
var routes = require ('./universal/routes');


////////////////////////
// Config
////////////////////////

var currentEnv = process.env.NODE_ENV || 'development';
console.log("Current Environment: " + currentEnv);

if ('development' == currentEnv) {
    var config = configDevelopment;
    console.log('Using Development CONFIG');
}

if ('production' == currentEnv) {
    var config = configProduction;
    console.log('Using Production CONFIG');
}


////////////////////////
// Create the Server
////////////////////////

var server = nodeEngineServer.init(config);

server.locals.globals = globals;


/////////////////////////
// View Engine Setup
/////////////////////////

// Optional


//////////////////////
// Static Assets
//////////////////////

var cacheTime = 100;
//nodeEngine.static(server, cacheTime);

server.use(express.static('media',{ maxAge: cacheTime }));
server.use(express.static(path.join(__dirname, '/static'),{ maxAge: cacheTime }));
server.use(express.static(path.join(__dirname, '/universal/css'),{ maxAge: cacheTime }));
server.use(express.static(path.join(__dirname, '/universal/js'),{ maxAge: cacheTime }));

///////////////
// REST API
///////////////

var dirName = __dirname;
var apiPath = "/api";
mongoRest.server(server, dirName, apiPath);


//////////////////////////////
// Express Test
//////////////////////////////

// Server Rendering with React Router
server.use('/express', require('./server/express'));


////////////////////////////////////////////////////////////
// Rendering React-Router with Pre-Render Data
////////////////////////////////////////////////////////////

// Server Rendering with React Router but after getting data from a api request.
// This version stores the data request in the page object for that path
var pageAPIPath = "http://localhost:3001/api/page?f1=path&v1=";
neRender.serverRender(server, routes, pageAPIPath, globals);