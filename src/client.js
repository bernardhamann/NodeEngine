'use strict';

import React from 'react';
import clientRender from './client/ne-render-client';

console.log("Client JS is Active");

var object = document.getElementById("about-link");
object.addEventListener("click", function(){
    clientRender.run("/about");
});