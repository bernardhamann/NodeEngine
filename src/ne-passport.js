var passportLocal = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var mongoose = require('mongoose');

var nePassport = {

    neUser: function (){

        var Schema = mongoose.Schema;

        var userSchema = new Schema({
            profile: {
                nameFirst: String,
                nameLast: String,
                email: String,
                phone: String
            },
            local: {
                username: String,
                password: String
            },
            token: String,
            createdAt:{type: String, required: true, default: new Date()}
        });

        var neUser = mongoose.model(
            'neUser',
            userSchema
        );

        return neUser
    },

    neUserRoutes: function (router){

        router.get('/', function(req, res){

        });

        router.put('/', function(req, res){

        });

        router.delete('/', function(req, res){

        });

        router.post('/', function(req, res){

        });


    },

    config: function (passport){

        passport.serializeUser(function(user, done){
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done){
            User.findById(id, function(err, user){
                done(err, user);
            })
        });
    },

    localConfig: function (passport, neUser){

        if (!neUser){
            var neUser =  self.neUser();
        }

    },

    localRoutes: function (passport, router){

    },

    facebookConfig: function (passport, neUser){

        if (!neUser){
            var neUser =  self.neUser();
        }

    },

    facebookRoutes: function (passport, router){

        var neUser =  self.neUser();

    },


    neMongoRestConfig: function (passport, neUser){

    },

    routes: function (server, passport){

        server.post('/passportget', function(req, res){

            var obj = req.body;
            var newDoc = new User(obj);
            newDoc.save(function (err, newDoc){
                if (err) return console.error(err);
                res.send(newDoc)
            })

        });

        server.get('/passportget',
            passport.authenticate('neMongoRest', {session: false}),
            function(req, res){
                res.json({
                    test: 'This is the data'
            })
        });

    }
};

module.exports = nePassport;


/*
// process.nextTick(function(){
User.findOne({'local.username': username}, function(err, user){
    if (err){
        return  done(err);
    }

    if (user){
        return done(null, false  ,req.flash('signupMessage', 'Email already used'));
    }

    else {
        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = password;

        newUser.save(function(err){
            if (err){
                throw err;
            }
            else {
                return done(null, newUser);
            }
        })
    }
});
// });


*/


/*

passport.use('passportLocal', new passportLocal({
    usernameField: 'username',
    passwordField: 'password',
    passRequestToCallback: true
    },
    function(username, password, done) {

        //process.nextTick(function() {

            User.findOne({'local.username': username}, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(user);
                }

                else {
                    var newUser = new User();
                    newUser.local.username = username;
                    newUser.local.password = password;
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        else {
                            return done(null,newUser) ;
                        }
                    })
                }
            })
        //})
    }
))

*/