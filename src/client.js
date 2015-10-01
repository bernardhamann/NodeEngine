'use strict';

import React from 'react';
var routes = require ('../node_engine/ne-routes-meta/routes');
import clientRender from './ne-render-client';

console.log("Client JS is Active");

var object = document.getElementById("about-link");
object.addEventListener("click", function(){
    clientRender.run(routes, "/about");
});