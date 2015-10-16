var gulp = require('gulp');
var babel = require('gulp-babel');

var stylus = require('gulp-stylus');
var rupture = require('rupture');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var lost = require('lost');
var rucksack = require('rucksack-css');


var neAdmin = {

    gulpCompileHandlers: function (){

        gulp.src('./node_modules/ne-admin/handlers/*.js')
            .pipe(babel())
            .pipe(gulp.dest('./app/handlers/'));

        return undefined

    },

    gulpCompileComponents: function (){

        gulp.src('./node_modules/ne-admin/components/*.js')
            .pipe(babel())
            .pipe(gulp.dest('./app/components/'));

        return undefined

    },

    gulpCompileCss: function (){

        gulp.src('./node_modules/ne-admin/css/*.css')
            .pipe(gulp.dest('./app/css/'));

        gulp.src('./node_modules/ne-admin/css/*.styl')
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

        return undefined

    },

    routes: function (server){

        var routes = require('./routes/neAdminRoutes')
        routes(server);

        return undefined
    }

}

module.exports = neAdmin;