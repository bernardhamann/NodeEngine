var neAuto = {

    //Internal Modules
    server: require('./server/serverConfig'),

    //External Modules
    express: require('express'),
    cors: require("cors"),
    debug: require('debug'),
    react: require('react'),
    reactRouter: require('react-router'),
    mongoose: require('mongoose'),
    axios: require('axios'),
    lodash: require('lodash'),
    stringifyObject: require('stringify-object'),
    jsonwebtoken: require('jsonwebtoken'),
    expressJwt: require('express-jwt'),
    passportFacebook: require('passport-facebook'),
    passportLocal: require('passport-local'),
    bcrypt: require('bcrypt-nodejs'),
    babel: require('babel'),
    webpackStream: require('webpack-stream'),
    gulp: require('gulp'),
    gulpBabel: require('gulp-babel'),
    gulpRename: require('gulp-rename'),
    del: require('del'),
    gulpStylus: require('gulp-stylus'),
    rupture: require('rupture'),
    gulpPostcss: require('gulp-postcss'),
    autoprefixer: require('autoprefixer'),
    precss: require('precss'),
    lost: require('lost'),
    rucksackCSS: require('rucksack-css'),

    //Node Engine Modules
    neData: require('ne-data'),
    neHandler: require('ne-handler'),
    neAdmin: require('ne-admin'),
    neAuth: require('ne-auth'),
    neGulp: require('ne-gulp')

};

module.exports = neAuto;