#!/usr/bin/env node

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var debug = require('debug')('express:server');
var config = require('../config.json');
var pm2 = require('../pm2.json');
var ReactEngine = require('react-engine');
var cors = require('cors');
var mongoose = require('mongoose');
// var fs = require('fs');
// var glob = require('glob');


////////////////////////
// Create the Server  //
////////////////////////

var server = express();


///////////////////
//    MongoDB    //
///////////////////

// This is used for mongodb
server.use(cors());

// for the rest post req
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(bodyParser.raw());
server.use(bodyParser.text());


var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
    mongoose.connect(pm2.env.MONGO_URL);
}

if ('production' == env) {
    mongoose.connect(process.env.MONGO_URL);
}

///////////////////
// React Engine  //
///////////////////


// create an engine instance
var engine = ReactEngine.server.create({
    reactRoutes:'./routes.jsx'
});

// view engine setup react engine
server.engine('.js', engine);

// set the view directory
server.set('views', path.join(__dirname, '/app/universal/handlers'));

// set jsx or js as the view engine
// (without this you would need to supply the extension to res.render())
// ex: res.render('index.jsx') instead of just res.render('index').
server.set('view engine', 'js');

// finally, set the custom view
server.set('view', require('react-engine/lib/expressView'));


////////////////////
// Static Assets  //
////////////////////


// Setup the static assets
var cacheTime = 1;
server.use(express.static(path.join(__dirname, '../media'),{ maxAge: cacheTime }));
server.use(express.static(path.join(__dirname, '/static'),{ maxAge: cacheTime }));
server.use(express.static(path.join(__dirname, '/universal/css'),{ maxAge: cacheTime }));
server.use(express.static(path.join(__dirname, '/universal/js'),{ maxAge: cacheTime }));


/////////////
// Routes  //
/////////////

// Setup the routes for the API
server.use('/api/people', require('./restapi/people'));

// Setup the routes for the Page Metadata
server.use('/api/page', require('./restapi/page'));


// Setup the redirect to the react router
server.use('/', require('./server/redirect'));


/////////////////////////
// Server Boilerplate  //
/////////////////////////


// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || pm2.env.PORT || '3000');
server.set('port', port);

//Normalize a port into a number, string, or false.
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        console.log("App is running on Port: " + port);
        return port;
    }

    return false;
}

// Create HTTP server.
// this might need to be here not sure
// var server = http.createServer(server);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


/////////////
// Random  //
/////////////

/* setup the client.js to load all the js files in the models folder maybe reuse this code
 fs.readdirSync(__dirname + '/models' ).forEach(function(filename){
 if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
 });
 */