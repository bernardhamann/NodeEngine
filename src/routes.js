'use strict';

import React from 'react';
import {Router, Route, DefaultRoute, NotFoundRoute } from 'react-router';

// Handlers
import MainHandler from './handlers/MainHandler.js';
import IndexHandler from './handlers/IndexHandler.js';
import AboutHandler from './handlers/AboutHandler.js';
import ContactHandler from './handlers/ContactHandler.js';
import PostsHandler from './handlers/PostsHandler.js';
import PeopleHandler from './handlers/PeopleHandler.js';
import NotFoundHandler from './handlers/NotFoundHandler.js';

var Routes = (
    <Route path="/" handler={MainHandler}>
        <Route path="about" handler={AboutHandler}></Route>
        <Route path="contact" handler={ContactHandler}></Route>
        <Route path="posts" handler={PostsHandler}></Route>
        <Route path="posts/:id" handler={PostsHandler}></Route>
        <Route path="people" handler={PeopleHandler}></Route>
        <DefaultRoute handler={IndexHandler}></DefaultRoute>
        <NotFoundRoute handler={NotFoundHandler}></NotFoundRoute>
    </Route>
);

export default Routes;