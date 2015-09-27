'use strict';
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var AboutHandler = require('./handlers/AboutHandler.js');
var ContactHandler = require('./handlers/ContactHandler.js');
var NotFoundHandler = require('./handlers/NotFoundHandler.js');
var Root = require('./handlers/routes.js');
var Routes = React.createElement(
    Route,
    { path: '/', handler: Root },
    React.createElement(Route, { path: '/about', handler: AboutHandler }),
    React.createElement(Route, { path: '/contact', handler: ContactHandler }),
    React.createElement(Route, { path: '*', handler: NotFoundHandler }));
module.exports = Routes;
// This is just a placeholder file use gulp to compile the file for use in the app