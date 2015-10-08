#!/usr/bin/env node

////////////////////////
// Create the Server
////////////////////////

var nodeEngineServer = require('ne-server');

var port = process.env.PORT;
var server = nodeEngineServer.init(port);


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

nodeEngineServer.static(server, dirNameStatic, cacheTime);


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
// Passport
///////////////

// Import passport
var passport = require ('passport');
var neAuth = require ('ne-auth');

// Configure additional strategies before init

// Initialize passport
neAuth.init(server, passport);
// Now you can use passport

// Use passport on routes
neAuth.authRoutes(server, passport);
neAuth.apiRoutes(server, passport, {userDetail: false});
// If userDetail is set to true you must define a user details models with the name of 'neuserdetail'



///////////////
// Content API
///////////////

var neMongo = require('ne-mongo');

var dirNameRest = __dirname;
var apiPath = "/api";
var strategyName = "neEditorTokens";
neMongo.routesConfig(server, dirNameRest, apiPath, passport, strategyName);


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

neRender.serverRender(server, appmeta, routes);


////////////////////////////////////////////////////////////
// ne-auth custom error handling
////////////////////////////////////////////////////////////


server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.redirect('/login?message=AccessDenied:InsufficientPermissions').status(401);
    }
});