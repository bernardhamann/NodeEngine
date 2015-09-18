import React from 'react';
import Router from 'react-router';
import routes from '../universal/routes';

// note sure about these
import preData from 'ne-data-before'
import { BrowserHistory, Route } from 'react-router';
var data = {};


var clientRender = {
    run: function (path) {

        Router.run(routes, path, function(Root, state){

            //var pathString = state.routes[1].path.substr(1);
            var pathString = "about";

            function renderPage (data){
                state.data = data;
                console.log(`Rendering <${pathString}> from CLIENT - START`);
                console.log(state);
                React.render(React.createElement(Root, state), document.getElementById("react-mount"));
                console.log(`Rendering <${pathString}> from CLIENT - DONE`);
            }

            // Get data before render for some components
            preData.forPath(pageAPIPath, pathString)
                .then((data)=>{
                    renderPage(data);
                })
        });

    }
};


export default clientRender;