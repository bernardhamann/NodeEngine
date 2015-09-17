#!/usr/bin/env node

var nodeEngine = require('ne-server');
var configDevelopment = require('../config/config.json');
var configProduction = require('../config/pm2.json');
var path = require('path');
var express = require('express');


////////////////////////
// Create the Server
////////////////////////


var currentEnv = process.env.NODE_ENV || 'development';
console.log("Current Environment: " + currentEnv);

var server = nodeEngine.init(currentEnv, configDevelopment, configProduction);

var config = server.locals.config;


/////////////////////////
// View Engine Setup
/////////////////////////


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
// Routes
///////////////

// People Rest API
server.use('/api/people', require('./restapi/people'));

// Page Rest API
server.use('/api/page', require('./restapi/page'));

// Emails Rest API
server.use('/api/emails', require('./restapi/emails'));

// Server Rendering with React Router
server.use('/express', require('./server/express'));

// Server Rendering with React Router
server.use('/', require('./server/ne-render-server'));
