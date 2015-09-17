'use strict';

var express = require('express');
var axios = require ('axios');
var React = require('react');
var Router = require('react-router');

var routes = require ('../universal/routes');
var preData = require('../universal/ne-data-pre');

var globals = require ('../../config/globals.json');
var configDevelopment = require('../../config/config.json');
var configProduction = require('../../config/pm2.json');

////////////////////////
// Setup the config
////////////////////////

var currentEnv = process.env.NODE_ENV || 'development';

if ('development' == currentEnv) {
    var config = configDevelopment.env;
    console.log('Using Development CONFIG');
}

if ('production' == currentEnv) {
    var config = configProduction.env;
    console.log('Using Production CONFIG');
}

let rootURL = config.ROOTURL;
console.log('rootURL');
console.log(rootURL);


////////////////////////
//
////////////////////////

var router = express.Router();

router.get('/express', function(req, res) {
    res.render('ExpressHandler', {
    });
});

router.get('*', function (req, res) {
    var doctype = '<!DOCTYPE html>';
    Router.run(routes, req.path, function (Root, state) {

        var pathString = state.routes[1].path.substr(1);

        function renderPage (data){
            data.globals = globals;
            state.data = data;
            state.query = req.query;
            console.log(`Rendering <${pathString}> from Server - START`);
            var html = React.renderToStaticMarkup(React.createElement(Root, state));
            var fullHtml = doctype + html;
            res.send(fullHtml);
            console.log(`Rendering <${pathString}> from Server - DONE`);
        }

        preData.fetch(rootURL, pathString)
            .then((data)=> {
                renderPage(data);
            })
    });
});

module.exports = router;
