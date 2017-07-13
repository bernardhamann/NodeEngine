var fs = require('fs');
var path = require('path');

var stringify = require('stringify-object');
//Gulp
var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var del = require('del');
var webpack = require('webpack-stream');
//Stylus
var stylus = require('gulp-stylus');
var rupture = require('rupture');
//PostCSS
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var lost = require('lost');
var rucksack = require('rucksack-css');


//////////////////////
//  compileMeta ✓
//////////////////////

function metaCompiler (dirName, handlersFolder){

    var appMetaFile = "";
    var appMetaFileHead = "var appmeta = [\n";
    var appMetaFileItems = [];

    var folderPath = dirName + "/" + handlersFolder;
    fs.readdirSync(folderPath).forEach(function(filename) {

        if (filename === 'aaRoot.js'){

            console.log('');
            console.log('');
            console.log("ne-gulp: " + filename + "Skipped on purpose");
            console.log('');
            console.log('');

        }
        else{

            var requirePath = dirName + "/" + handlersFolder + filename;

            console.log(' ');
            console.log(' ');
            console.log('neGulp compileMeta with requirePath: ' + requirePath);
            console.log(' ');
            console.log(' ');


            var meta = require(requirePath).meta;
            // var metaString = JSON.stringify(meta)

            if(meta){
                var metaString = stringify(meta, {
                    indent: '  ',
                    singleQuotes: false
                });

                console.log('');
                console.log('');
                console.log('ne-gulp: metaString');
                console.log(metaString);
                console.log('');
                console.log('');

                appMetaFileItems.push(metaString);
                //appMetaFileItems = appMetaFileItems.concat(metaString);
            }
            else{
                console.log('');
                console.log('');
                console.log('ERROR');
                console.log('ne-gulp: meta not found for ' + filename);
                console.log('');
                console.log('');
            }
        }
    });

    var appMetaFileFoot = "\n]; \nmodule.exports = appmeta;";

    // Compile the appRoutes file
    appMetaFile = appMetaFile.concat(
        appMetaFileHead,
        appMetaFileItems,
        appMetaFileFoot
    );

    console.log('');
    console.log('');
    console.log("ne-gulp: The meta file was compiled!");
    console.log('');
    console.log('');

    var destFilePath = dirName + "/node-engine/appmeta.js";


    fs.writeFile(destFilePath, appMetaFile, 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('');
        console.log('');
        console.log("ne-gulp: The meta file was saved in " + destFilePath);
        console.log('');
        console.log('');

    });

    return appMetaFile ;

}

var compileMeta = function (dirName){

    var handlersFolder = "app/handlers/";
    // var dataFolder = "app/data/";

    var newDirPath = dirName + "/ne/ne-gulp/";

    try {
        stats = fs.lstatSync(newDirPath);
        if (stats.isDirectory()) {
            // Yes it is
            metaCompiler(dirName, handlersFolder);
            compileRoutesFile(dirName, handlersFolder);
        }
    }
    catch (e) {
        fs.mkdir(newDirPath);
        console.log("ne-gulp: Creating directory " + newDirPath);
        metaCompiler(dirName, handlersFolder);
        compileRoutesFile (dirName, handlersFolder);
        // compileDataRef (dirName, dataFolder)
    }

    return undefined

};





/*

//////////////////////
//  CompileRoutesFile (Setup the routes server stuff first)
//////////////////////

function routeCompiler (dirName, handlersFolder){

    // Import the dependencies
    var routesFileBase = "'use strict';";
    var routesFileImportVendor = "var React = require('react');var Router = require('react-router');var Route = Router.Route;";
    var routesFileImportRoot = "var Root = require('../../node_engine/ne-gulp/root/root.js');";

    // Import the handlers
    // var IndexHandler = require('./handlers/IndexHandler.js');
    var folderPathForHandlers = dirName + "/" + handlersFolder;
    var routesFileImportHandlers = "";

    // This this needs to be fixed, if will not work in neGulp is not installed in the root of the node_modules folder
    // Maybe compile this to the node_engine folder
    var notFoundHandlerImport = "var neGulpNotFoundHandler = require('../../node_modules/ne-gulp/root/neGulpNotFoundHandler.js').handler;";
    routesFileImportHandlers = routesFileImportHandlers.concat(notFoundHandlerImport);

    fs.readdirSync(folderPathForHandlers).forEach(function(filename) {

        if (path.extname(filename) === ".css"){

            console.log('');
            console.log('');
            console.log('css');
            console.log('');
            console.log('');

        }
        else if (filename === 'aaRoot.js'){

            console.log('');
            console.log('');
            console.log('ne-gulp: skipped aaRoot.js');
            console.log(filename);
            console.log('');
            console.log('');

        }
        else{

            var handlerName = filename.substr(0,filename.length - 3);
            var requireString = "var " + handlerName + " = require('../../app/handlers/" + handlerName + ".js').handler;";
            routesFileImportHandlers = routesFileImportHandlers.concat(requireString);

        }
    });
    //var lastRouteHandler = "var NotFoundHandler = require('./handlers/NotFoundHandler.js');";
    //routesFileImportHandlers = routesFileImportHandlers.concat(lastRouteHandler);


    // Build the routes object
    var routesFileRoutesHead = "var Routes = React.createElement(";
    var routesFileRoutesRoot = "Route,{ path: '/', handler: Root },";
    var routesFileRoutesRootRoutes = "";
    var folderPathForRoutes = dirName + "/" + handlersFolder;

    var lastRoute = "React.createElement(Route, { path: '*', handler: neGulpNotFoundHandler })";

    fs.readdirSync(folderPathForRoutes).forEach(function(filename) {

        if (filename === 'notFoundHandler.js') {

            lastRoute = "React.createElement(Route, { path: '*', handler: notFoundHandler })";

            console.log('');
            console.log('');
            console.log('ne-gulp: Custom lastRoute ');
            console.log(lastRoute);
            console.log('');
            console.log('');
        }
        else if (filename === 'aaRoot.js'){

            console.log('');
            console.log('');
            console.log('ne-gulp: filename');
            console.log(filename);
            console.log('');
            console.log('');
        }
        else {
            var handlerName = filename.substr(0, filename.length - 3);


            // var requirePath = "../../" + handlersFolder + filename;
            // var requirePath = dirName + "/app/handlers/" + filename;

            var requirePath = dirName + "/" + handlersFolder + filename;

            console.log(' ');
            console.log(' ');
            console.log('neGulp compileRoutesFile: ');
            console.log('requirePath');
            console.log(requirePath);
            console.log(' ');
            console.log(' ');


            var meta = require(requirePath).meta;
            if(meta){
                var thisRoute = "React.createElement(Route, { path: '" + meta.path + "', handler: " + handlerName + " }),";
                routesFileRoutesRootRoutes = routesFileRoutesRootRoutes.concat(thisRoute);
            }
            else{
                console.log('');
                console.log('');
                console.log('ERROR');
                console.log('ne-gulp: meta not found for ' + filename);
                console.log(filename);
                console.log('');
                console.log('');
            }

        }

    });
    var routesFileRouteslastRoute = lastRoute;
    //routesFileRoutesRootRoutes = routesFileRoutesRootRoutes.concat(lastRoute);
    var routesFileRoutesFoot = ");";
    var routesFileExport = "module.exports = Routes;";

    // Compile the appRoutes file
    var routesFile = routesFileBase.concat(
        routesFileImportVendor,
        routesFileImportHandlers,
        routesFileImportRoot,
        routesFileRoutesHead,
        routesFileRoutesRoot,
        routesFileRoutesRootRoutes,
        routesFileRouteslastRoute,
        routesFileRoutesFoot,
        routesFileExport
    );

    console.log('');
    console.log('');
    console.log("ne-gulp: The routes file was compiled!");
    console.log('');
    console.log('');

    var destFilePath = dirName + "/node_engine/ne-gulp/routes.js";

    fs.writeFile(destFilePath, routesFile, 'utf8',  function(err) {
        if(err) {
            return console.log(err);
        }

        console.log('');
        console.log('');
        console.log("ne-gulp: The routes file was saved in " + destFilePath);
        console.log('');
        console.log('');

    });

    return undefined;

}

*/

/*

var compileRoutes = function (dirName){

    var handlersFolder = "app/handlers/";
    // var dataFolder = "app/data/";

    var newDirPath = dirName + "/ne/ne-gulp/";

    try {
        stats = fs.lstatSync(newDirPath);
        if (stats.isDirectory()) {
            // Yes it is
            routeCompiler(dirName, handlersFolder);
        }
    }
    catch (e) {
        fs.mkdir(newDirPath);
        console.log("ne-gulp: Creating directory " + newDirPath);
        routeCompiler(dirName, handlersFolder);
        // compileDataRef (dirName, dataFolder)
    }

    return undefined
};

*/



//////////////////////
//  gulpAuto
//////////////////////

var autoHello = function () {

    console.log('            __                                          ');
    console.log('           /..\\___                                     ');
    console.log('          /       \\                                    ');
    console.log('    _     \\`______/ _                                  ');
    console.log('___/ \\____|_|______/ \\________________________________');
    console.log('   \\ /             \\ /                                ');

};

var autoStatic = function (){

    gulp.src('src/static/**/**/**/*')
        .pipe(gulp.dest('./app/static/'));

    return gulp.watch('src/static/**/**/**/*', [
        'static'
    ]);

};


var autoClear = function () {

    del([
        // 'dist/report.csv',
        // here we use a globbing pattern to match everything inside app folder
        'app/**/*'
    ]);

    del([
        'node_engine/**/*'
    ]);

    return undefined
};


var autoBabel = function () {

    gulp.src('src/**/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/'));

    return undefined;

    // return gulp.watch('src/**/**/**/*.js', [
        //'babel'
    //]);
};

var autoWebpack = function (dirName, options) {

    var requirePath;
    if (options && options.compileFor === "production") {
        requirePath = dirName + "/node_modules/ne-gulp/webpack-production.js";
    }
    else {
        requirePath = dirName + "/node_modules/ne-gulp/webpack.js";
    }

    gulp.src('src/client.js')
        .pipe(webpack(require(requirePath)))
        .pipe(gulp.dest('./app/js/'));

    return undefined
};


var autoStyl = function () {

    gulp.src('src/css/*.css')
        .pipe(gulp.dest('./app/css/'));

    gulp.src('src/css/*.styl')
        .pipe(stylus({
            use: [
                rupture()
            ]
        }))
        .pipe(postcss([
            precss({}),
            lost(),
            autoprefixer({}),
            rucksack
            //csswring
        ]))
        .pipe(gulp.dest('./app/css/'));

    return gulp.watch('src/css/*.styl', [
        'style'
    ]);
};


//////////////////////
//  Install Node Engine
//////////////////////

var installComponents = function () {

    gulp.src('./node_modules/*/ne-components/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./ne/'));

    gulp.src('./node_modules/*/ne-components/*/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./ne/'));

    gulp.src('./node_modules/*/ne-components/*/*/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./ne/'));

    return undefined

};


var installHelpers = function () {

};


var installRoutes = function () {

    gulp.src('./node_modules/*/ne-routes/*')
        .pipe(rename({
            dirname: "/routes"
        }))
        .pipe(gulp.dest('./app'));

    return undefined

};

var installStatics = function () {

    gulp.src('./node_modules/*/ne-statics/*')
        .pipe(rename({
            dirname: "/statics"
        }))
        .pipe(gulp.dest('./app'));

    gulp.src('./node_modules/*/ne-statics/*/*')
        .pipe(rename({
            dirname: "/statics"
        }))
        .pipe(gulp.dest('./app'));

    gulp.src('./node_modules/*/ne-statics/*/*/*')
        .pipe(rename({
            dirname: "/statics"
        }))
        .pipe(gulp.dest('./app'));

    return undefined

};


var installStyles = function () {

    gulp.src('./node_modules/*/ne-styles/*.css')
        .pipe(rename({
            dirname: "/styles"
        }))
        .pipe(gulp.dest('./app/styles/'));

    gulp.src('./node_modules/*/ne-styles/*.styl')
        .pipe(stylus({
            use: [
                rupture()
            ]
        }))
        .pipe(postcss([
            precss({}),
            lost(),
            autoprefixer({}),
            rucksack
            //csswring
        ]))
        .pipe(rename({
            dirname: "/styles"
        }))
        .pipe(gulp.dest('./app/'));

    return undefined

};


var installViews = function () {

    gulp.src('./node_modules/*/ne-handlers/*.js')
        .pipe(babel())
        .pipe(rename({
            dirname: "/views"
        }))
        .pipe(gulp.dest('./app'));


    //gulp.src('./node_modules/*/ne-handlers/*.js')
    //    .pipe(babel())
    //    .pipe(gulp.dest('./node_engine/'));

    return undefined

};


/*

var installNeImports = function () {


    gulp.src('./node_modules/*/ne-imports/*.styl')
        .pipe(gulp.dest('./node-engine/'));

    return undefined

};



var installNeRoot = function () {

    gulp.src('./node_modules/ne-gulp/root/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./node_engine/ne-gulp/root/'));

    return undefined

};

*/

var neInstall = function () {

    installComponents();
    installHelpers();
    installRoutes();
    installStatics();
    installStyles();
    installViews();


    installNeRoot();
    installNeImports();

};

//////////////////////
//  Exports
//////////////////////

// Install Node Engine
exports.neInstall = neInstall;

// Compile Node Engine
exports.compileViews = compileViews;

// auto
exports.autoStyl = autoStyl;
exports.autoStatic = autoStatic;
exports.autoClear = autoClear;
exports.autoBabel = autoBabel;
exports.autoWebpack = autoWebpack;
exports.autoHello = autoHello;
