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
    <Route name="MainRoute" path="/" handler={MainHandler}>
        <Route name="about" path="about" handler={AboutHandler}></Route>
        <Route name="contact" path="contact" handler={ContactHandler}></Route>
        <Route name="posts" path="posts" handler={PostsHandler}></Route>
        <Route name="posts/:id" path="posts/:id" handler={PostsHandler}></Route>
        <Route name="people" path="people" handler={PeopleHandler}></Route>
        <DefaultRoute name="IndexRoute" handler={IndexHandler}></DefaultRoute>
        <NotFoundRoute name="NotFoundRoute" handler={NotFoundHandler}></NotFoundRoute>
    </Route>
);

export default Routes;