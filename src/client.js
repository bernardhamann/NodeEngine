'use strict';

import React from 'react';
var routes = require ('./routes');
import clientRender from './client/ne-render-client';

console.log("Client JS is Active");

var object = document.getElementById("about-link");
object.addEventListener("click", function(){
    clientRender.run(routes, "/about");
});