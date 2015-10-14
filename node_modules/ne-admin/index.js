var gulp = require('gulp');
var babel = require('gulp-babel');

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

    routes: function (server){

        var routes = require('./routes/neAdminRoutes')
        routes(server);
    }

}

module.exports = neAdmin;