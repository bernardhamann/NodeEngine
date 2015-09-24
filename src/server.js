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
var nePassport = require ('./ne-passport');

// Create the User model
var neUser = nePassport.neUser();

// Configure strategies

// neLocal Strategy

// neMongoRest Strategy
var mongoRest = require('ne-mongo-rest');
mongoRest.passportConfig(passport, neUser);

// Initialize passport
// can not use passport before this and all config must be above this
server.use(passport.initialize());


///////////////
// REST API
///////////////

var dirNameRest = __dirname;
var apiPath = "/api";
mongoRest.routesConfig(server, dirNameRest, apiPath, passport);


//////////////////////////////
// Express Test
//////////////////////////////

server.use('/express', require('./server/express'));


////////////////////////////////////////////////////////////
// Rendering React with React-Router on the server with Pre-Render Data from API's
////////////////////////////////////////////////////////////

var neRender = require('ne-render');
var appmeta = require ('./appmeta');
var routes = require ('./routes');

neRender.serverRender(server, appmeta, routes);


////////////////////////
// Passport
////////////////////////

/*

 var flash = require ('connect-flash');
 server.use(flash());

 */

/*
 // var session = require('express-session');
 // secret:'anystring'
 server.use(session(
 {
 secret: 'thesecret',
 saveUninitialized: true,
 resave: false
 }
 ));

 server.use(passport.session());

 */

/*

 var nePassport = require('./passport');
 nePassport.config(passport);
 nePassport.routes(server, passport);

 */