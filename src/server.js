#!/usr/bin/env node

////////////////////////
// Create the Server
////////////////////////

var neServer = require('ne-server');

var port = process.env.PORT;
var server = neServer.init(port);


////////////////////////
// Logging
////////////////////////

// Logs every transaction to the console
var morgan = require('morgan');
server.use(morgan('dev'));


//////////////////////
// Static Assets
//////////////////////

var dirNameStatic = __dirname;
var cacheTime = 100;

neServer.static(server, dirNameStatic, cacheTime);

///////////////
// Mongo
///////////////

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);


///////////////
// Cookies
///////////////

var cookieParser = require('cookie-parser');
// Parse the cookies in the headers and set it as the req.cookies variable
server.use(cookieParser());


///////////////
// neAuth
///////////////

// Import passport
var passport = require ('passport');
var neAuth = require ('ne-auth');

// Configure additional passport here strategies before init
neAuth.config(passport);

// Initialize passport
neAuth.init(server, passport);

// Setup the routes
neAuth.routes(server, passport,{usersDetail: false, insecure: false });
// If usersDetail is set to true you must define a user details models with the name of 'neuserdetail'
// If insecure is set to true then all users can edit users
// Now you can use passport configure additional routes here


///////////////
// Content API
///////////////

var neData = require('ne-data');
var dirNameNeData = __dirname;
neData.routesConfig(server, dirNameNeData);


///////////////
// Admin Api
///////////////

/*
var neAdmin = require('ne-admin');
neAdmin.routes(server);
*/


//////////////////////
// Routes
//////////////////////

var dirNameRoutes = __dirname;
neServer.routes(server, dirNameRoutes);


//////////////////////////////
// Express Test
//////////////////////////////

server.use('/express', require('./js/express'));


////////////////////////////////////////////////////////////
// Rendering React with React-Router on the server with Pre-Render Data from API's
////////////////////////////////////////////////////////////

var neRender = require('ne-render');
var appmeta = require ('../node_engine/ne-gulp/appmeta');
var routes = require ('../node_engine/ne-gulp/routes');
var dataRef = require('../node_engine/ne-gulp/dataRef');

neRender.serverRender(server, appmeta, routes, dataRef);


////////////////////////////////////////////////////////////
// ne-auth custom error handling
////////////////////////////////////////////////////////////


server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.redirect('/login?message=AccessDenied:InsufficientPermissions').status(401);
    }
});