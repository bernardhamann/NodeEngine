'use strict';

import express from 'express';
import React from 'react';
import Router from 'react-router';
import routes from '../universal/routes'
import axios from 'axios';
import getData from '../universal/getData';

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
            state.data = data;
            state.query = req.query;
            console.log(state);
            console.log(`Rendering <${pathString}> from Server - START`);
            var html = React.renderToStaticMarkup(React.createElement(Root, state));
            var fullHtml = doctype + html;
            res.send(fullHtml);
            console.log(`Rendering <${pathString}> from Server - DONE`);
        }

        // Get data before render for some components
        getData.forPath(pathString)
            .then((data)=>{
                renderPage(data);
            })
    });
});

export default router

/*

           axios.get('http://localhost:3001/api/people')
                .then((dataRes)=>{
                    data.people = dataRes.data;
                    renderPage(data)
                });
 */


// Rename this to node-engine/react-universal.server