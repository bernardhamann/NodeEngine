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
var nePassport = require ('ne-passport');


// Configure strategies
//nePassport.neSuperStrategyConfig(passport);
//nePassport.neAdminStrategyConfig(passport);
//nePassport.neEditorStrategyConfig(passport);
//nePassport.localStrategyConfig(passport);

// Initialize passport
// can not use passport before this and all config must be above this
nePassport.init(server, passport);

// Strategy routes
nePassport.neSuperStrategyRoutes(server, passport);
nePassport.neAdminStrategyUsersRoutes(server, passport);
nePassport.neAdminStrategyEditorTokensRoutes(server, passport);

nePassport.neSuperStrategyRoutesUserAssign(server, passport);



nePassport.localStrategyRoutes(server, passport);


///////////////
// Content API
///////////////

var mongoRest = require('ne-mongo');

var dirNameRest = __dirname;
var apiPath = "/api";

var strategyName = "neEditorTokens";
mongoRest.routesConfig(server, dirNameRest, apiPath, passport, strategyName);


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


////////////////////////
// Passport
////////////////////////


/*

 var nePassport = require('./passport');
 nePassport.config(passport);
 nePassport.routes(server, passport);

 */