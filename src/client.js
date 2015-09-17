'use strict';

import React from 'react';
import clientRender from './client/ne-client-render';

console.log("Client JS is Active");

var object = document.getElementById("about-link");
object.addEventListener("click", function(){
    clientRender.run("/about");
});