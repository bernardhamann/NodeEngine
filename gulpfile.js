var gulp = require('gulp');
var del = require('del');
var nodemon = require('gulp-nodemon');

// Style
var stylus = require('gulp-stylus');
var nib = require('nib');
var jeet = require('jeet');
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
//      Clear       //
//////////////////////

// Delete the app folder content
gulp.task('clear', function () {
    del([
        // 'dist/report.csv',
        // here we use a globbing pattern to match everything inside app folder
        'app/**/*'
    ]);
});


//////////////////////
//      Server      //
//////////////////////

// Copy the Server file
gulp.task('ServerJS', function() {

    gulp.src('src/server.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/'));

    gulp.watch('src/server.js', [
        'ServerJS'
    ]);

});

// Copy the Server Support files
gulp.task('ServerSupJS', function() {

    gulp.src('src/server/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/server/'));

    gulp.watch('src/server/**/**/*.js', [
        'ServerSupJS'
    ]);

});


//////////////////////
//      Static      //
//////////////////////



// Copy the Static Pages files
gulp.task('StaticPages', function() {

    gulp.src('src/static/**/**/**/*.html')
        .pipe(gulp.dest('./app/static/'));

    gulp.watch('src/static/**/**/**/*.html', [
        'StaticPages'
    ]);

});




//////////////////////
//    Universal     //
//////////////////////


// Use babel to compile jsx components into javascript
// Compile the universal files to app folder with babel
// Use babel to compile jsx components into javascript
// So that when rendering components on the server you don't need to worry about the JSX transpiling
gulp.task('UniversalJS', function() {

    gulp.src('src/universal/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/universal/'));

    gulp.watch('src/universal/**/**/*.js', [
        'UniversalJS'
    ]);
});


// Compile Stylus files
gulp.task('UniversalCSS', function () {
    gulp.src('src/universal/css/*.styl')
        .pipe(stylus({
            use: [
                nib(),
                rupture(),
                jeet()
            ]
        }))
        .pipe(postcss([
            precss({}),
            lost(),
            autoprefixer({})
            //csswring
        ]))
        .pipe(gulp.dest('./app/universal/css/'));

    gulp.watch('src/universal/css/*.styl', [
        'UniversalCSS'
    ]);
});


//////////////////////
//      Client      //
//////////////////////


gulp.task('ClientJS', function(){

    gulp.src('src/client.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('./app/universal/js/'));

    gulp.watch('src/universal/**/**/*.js', [
        'ClientJS'
    ]);

});

gulp.task('ClientSupJS', function() {

    gulp.src('src/client/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/client/'));

    gulp.watch('src/client/**/**/*.js', [
        'ClientSupJS'
    ]);
});


//////////////////////
//     REST API     //
//////////////////////

gulp.task('RestAPIJS', function() {

    gulp.src('src/restAPI/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/restAPI/'));

    gulp.watch('src/restAPI/**/**/*.js', [
        'RestAPIJS'
    ]);

});



//////////////////////
//       Start      //
//////////////////////


gulp.task('Nodemon', function () {
    nodemon({
        script: 'app/server.js',
        ext: 'js'
    });
});



gulp.task('default', [
    'hello',
    'ServerJS',
    'ServerSupJS',
    'UniversalCSS',
    'UniversalJS',
    'StaticPages',
    'ClientJS',
    'ClientSupJS',
    'RestAPIJS',
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


*/
