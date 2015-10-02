var gulp = require('gulp');
var del = require('del');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');

// Style
var stylus = require('gulp-stylus');
//var nib = require('nib');
var rupture = require('rupture');
var postcss = require('gulp-postcss');
//var csswring = require('csswring');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var lost = require('lost');

// JS
var babel = require('gulp-babel');
var webpack = require('webpack-stream');

// var browserSync = require('browser-sync');

// Node Engine
var fs = require('fs');
var rename = require("gulp-rename");
var wait = require('gulp-wait');
// var next= require('gulp-next');


//////////////////////
//    Hello World   //
//////////////////////

gulp.task('hello', function() {
    console.log('            __                                          ');
    console.log('           /..\\___   Hello, You need to check up on me ');
    console.log('          /       \\            I crash your gulp watch ');
    console.log('    _     \\`______/ _                        sometimes ');
    console.log('___/ \\____|_|______/ \\________________________________');
    console.log('   \\ /             \\ /                                ');
    console.log('Sometimes when making changes to files');
    console.log('the watch command crashes, ');
    console.log('just run gulp again to start it up again. ');
});

//////////////////////
//  Clear
//////////////////////

gulp.task('clear', function () {
    del([
        // 'dist/report.csv',
        // here we use a globbing pattern to match everything inside app folder
        'app/**/*'
    ]);
});


//////////////////////
//  Style
//////////////////////

gulp.task('style', function () {

    gulp.watch('src/css/*.styl', [
        'style'
    ]);

    return gulp.src('src/css/*.styl')
        .pipe(stylus({
            use: [
                rupture()
            ]
        }))
        .pipe(postcss([
            precss({}),
            lost(),
            autoprefixer({})
            //csswring
        ]))
        .pipe(gulp.dest('./app/css/'));

});


//////////////////////
//  Copy
//////////////////////

gulp.task('static', function() {

    gulp.watch('src/static/**/**/**/*.html', [
        'static'
    ]);

    return gulp.src('src/static/**/**/**/*.html')
        .pipe(gulp.dest('./app/static/'));

});


//////////////////////
//  Babel
//////////////////////

gulp.task('babel', function() {

    gulp.watch('src/**/**/**/*.js', [
        'babel'
    ]);

    return gulp.src('src/**/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/'));

});


//////////////////////
//  Node Engine
//////////////////////

gulp.task('neGulp',['babel'], function() {

    // Run custom Node Engine modules here
    var nePassport = require ('ne-passport');
    nePassport.handlers();

    // Compile the routes.js and the appmeta.js files
    var compileNow = function(){
        var neGulp = require ('ne-gulp');
        var dirName = __dirname;
        var handlersFolder = "app/handlers/";
        neGulp(dirName,handlersFolder);
    };
    setTimeout(compileNow, 2000);

    return undefined

});


//////////////////////
//  Webpack
//////////////////////

gulp.task('webpack', ['neGulp'], function(){

    gulp.src('src/**/**/**/*.js')
        .pipe(webpack( require('./webpack.js') ))
        .pipe(gulp.dest('./app/js/'));

});


//////////////////////
//  Nodemon
//////////////////////


gulp.task('Nodemon', function () {

    env({
        file: './config-d.json',
        vars: {
            // any variables you want to overwrite
        }
    });

    return nodemon({
        script: 'app/server.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
});


gulp.task('default', [
    'style',
    'static',
    'babel',
    'neGulp',
    'webpack',
    'Nodemon'
]);



//////////////////////
//       Misc       //
//////////////////////



// run a server to help with reloads etc
/*
 gulp.task('browserSync', function() {
 browserSync({
 // tell the server where to get its files
 server: {
 baseDir: './app'
 }
 });
 });
 */

/*
var nodemon = require('gulp-nodemon');





gulp.task('neMeta',['babel'], function() {

    var dirName = __dirname;
    var handlersFolder = "app/handlers/";

    return gulp.src('node_engine/blank.js')
        .pipe(rename('appmeta.js'))
        .pipe(wait(1000))
        .pipe(neMeta(dirName, handlersFolder))
        .pipe(gulp.dest('./node_engine/gulp-ne-meta/'));
        //.pipe(next(function(){
        //    console.log('neMeta done');
        //    gulp.start('neRoutes');
        //}));

});


gulp.task('neRoutes',['babel'], function() {

    var dirName = __dirname;
    var handlersFolder = "app/handlers/";

    return gulp.src('node_engine/blank.js')
        .pipe(rename('routes.js'))
        .pipe(wait(1000))
        .pipe(neRoutes(dirName, handlersFolder))
        .pipe(gulp.dest('./node_engine/gulp-ne-routes/'));
        //.pipe(next(function(){
        //    console.log('neRoutes done');
        //    gulp.start('webpack');
        //}));

});



*/

// Use this to setup the tasks to run one after the other
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-tasks-in-series.md
//
