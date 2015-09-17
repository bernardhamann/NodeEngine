'use strict';

import express from 'express';
import React from 'react';
import Router from 'react-router';
import routes from '../universal/routes'
import axios from 'axios';
import preData from '../universal/ne-data-pre';


import config from './../../config.json';
let rootURL = config.globals.ROOTURL;
let globals = config.globals;
console.log('rootURL');
console.log(rootURL);


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

export default router


// Rename this to node-engine/react-universal.server