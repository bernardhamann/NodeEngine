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
//     REST API     //
//////////////////////

gulp.task('RestAPIJS', function() {

    gulp.src('src/api/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/api/'));

    gulp.watch('src/api/**/**/*.js', [
        'RestAPIJS'
    ]);

});


//////////////////////
//      Client      //
//////////////////////


gulp.task('ClientJS', function(){

    gulp.src('src/client.js')
        .pipe(webpack( require('./config/webpack.js') ))
        .pipe(gulp.dest('./app/js/'));

    gulp.watch('src/client.js', [
        'ClientJS'
    ]);

    gulp.watch('src/components/**/**/*.js', [
        'ClientJS'
    ]);
    gulp.watch('src/client/**/**/*.js', [
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
//   Components     //
//////////////////////

// Use babel to compile jsx components into javascript
// Compile the universal files to app folder with babel
// Use babel to compile jsx components into javascript
// So that when rendering components on the server you don't need to worry about the JSX transpiling
gulp.task('components', function() {

    gulp.src('src/components/**/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/components/'));

    gulp.watch('src/components/**/**/*.js', [
        'components'
    ]);
});


// Compile Stylus files
gulp.task('CSS', function () {
    gulp.src('src/css/*.styl')
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

    gulp.watch('src/css/*.styl', [
        'CSS'
    ]);
});


//////////////////////
//     Handlers     //
//////////////////////

// Use babel to compile jsx components into javascript
// Compile the universal files to app folder with babel
// Use babel to compile jsx components into javascript
// So that when rendering components on the server you don't need to worry about the JSX transpiling
gulp.task('handlers', function() {

    gulp.src('src/handlers/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/handlers/'));

    gulp.watch('src/handlers/**/*.js', [
        'handlers'
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
//       src        //
//////////////////////


// convert the appConfig File
gulp.task('appConfig', function() {

    gulp.src('src/appConfig.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/'));

    gulp.watch('src/appConfig.js', [
        'appConfig'
    ]);

});


// convert the routes file
gulp.task('routes', function() {

    gulp.src('src/routes.js')
        .pipe(babel())
        .pipe(gulp.dest('./app/'));

    gulp.watch('src/routes.js', [
        'routes'
    ]);

});



//////////////////////
//       Start      //
//////////////////////


gulp.task('Nodemon', function () {

    env({
        file: 'config/config.json',
        vars: {
            // any variables you want to overwrite
        }
    });

    nodemon({
        script: 'app/server.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
});



gulp.task('default', [
    'hello',
    'RestAPIJS',
    'ClientJS',
    'ClientSupJS',
    'components',
    'handlers',
    'ServerJS',
    'ServerSupJS',
    'StaticPages',
    'CSS',
    'appConfig',
    'routes',
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
