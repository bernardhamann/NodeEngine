var passportLocal = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var mongoose = require('mongoose');
var express = require('express');
var Schema = mongoose.Schema;

var expressSession = require('express-session');
var flash = require ('connect-flash');

var fs = require ('fs');




//////////////////////////////
// neSuper Token
//////////////////////////////

var neSuperToken = process.env.NE_SUPER_TOKEN;



//////////////////////////////
// neAdmin Tokens
//////////////////////////////

var neAdminTokensSchema = new Schema({
    token: String,
    user:{
        type: Schema.ObjectId,
        ref: 'neUsers',
        default: null
    },
    createdAt:{type: String, required: true, default: new Date()}
});

var neAdminTokens = mongoose.model(
    'neAdminTokens',
    neAdminTokensSchema
);


//////////////////////////////
// neEditor Tokens
//////////////////////////////


var neEditorTokensSchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'neUsers',
        default: null
    },
    token: String,
    createdAt:{type: String, required: true, default: new Date()}
});

var neEditorTokens = mongoose.model(
    'neEditorTokens',
    neEditorTokensSchema
);


//////////////////////////////
// neReader Tokens
//////////////////////////////


var neReaderTokensSchema = new Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'neUsers',
        default: null
    },
    token: String,
    createdAt:{type: String, required: true, default: new Date()}
});

var neReaderTokens = mongoose.model(
    'neReaderTokens',
    neReaderTokensSchema
);



//////////////////////////////
// neUsers
//////////////////////////////

var neUsersSchema = new Schema({
    profile: {
        nameFirst: String,
        nameLast: String,
        email: String,
        phone: String,
        detail: {

        }
    },
    tokens: {
        neAdmin:{
            type: Schema.ObjectId,
            ref: 'neAdminTokens',
            default: null
        },
        neEditor:{
            type: Schema.ObjectId,
            ref: 'neEditorTokens',
            default: null

        },
        neReader:{
            type: Schema.ObjectId,
            ref: 'neReaderTokens',
            default: null
        }
    },
    local: {
        username: String,
        password: String
    },
    log: Array,
    createdAt:{type: String, required: true, default: new Date()}
});


neUsersSchema.methods.generateContentAdminToken = function (){
    var token = new Token();

};

var neUsers = mongoose.model(
    'neUsers',
    neUsersSchema
);


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

var nePassport = {

//////////////////////////////
// Setup
//////////////////////////////

    neSuperToken: neSuperToken,

    neAdminTokens: neAdminTokens,

    neEditorTokens: neEditorTokens,

    neUsers: neUsers,


//////////////////////////////
// ???
//////////////////////////////

    configPassport: function (passport){

        passport.serializeUser(function(user, done){
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done){
            neUsers.findById(id, function(err, user){
                done(err, user);
            })
        });



    },


    init: function (server, passport){

        server.use(flash());


        passport.serializeUser(function(user, done){
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done){
            neUsers.findById(id, function(err, user){
                done(err, user);
            })
        });

        // secret:'anystring'
        server.use(expressSession(
            {
                secret: 'thesecret',
                saveUninitialized: true,
                resave: false
            }
        ));

        server.use(passport.initialize());
        server.use(passport.session());




    },


//////////////////////////////
// neSuperAdmin
//////////////////////////////


    neSuperStrategyConfig: function (passport){

        passport.use('neSuperTokens', new BearerStrategy(
            function (token, done) {

                if (token !== neSuperToken){
                    return done(null, false);
                }
                else {
                    return done(null, token)
                }
            }
        ));

    },

    neSuperStrategyRoutes: function (server, passport){

        var router = express.Router();
        var strategyName = "neSuperTokens";
        var populatePath = "";

        this.routesTemplate(router, passport, strategyName, neAdminTokens, populatePath);

        server.use('/admin/api/tokens/admin', router);

    },

//////////////////////////////
// neAdminTokens
//////////////////////////////


    neAdminStrategyConfig: function (passport){

        passport.use('neAdminTokens', new BearerStrategy(
            function (token, done) {
                neAdminTokens.findOne({'token': token}, function (err, tokenObject) {
                    if (err) {
                        return done(err);
                    }
                    if (!tokenObject) {
                        return done(null, false);
                    }
                    return done(null, tokenObject, {scope: 'all'});
                });
            }
        ));

    },

    neAdminStrategyUsersRoutes: function (server, passport){

        var router = express.Router();
        var strategyName = "neAdminTokens";
        var populatePath = "";

        this.routesTemplate(router, passport, strategyName, neUsers, populatePath);

        server.use('/admin/api/users', router);

    },

    neAdminStrategyEditorTokensRoutes: function (server, passport){

        var router = express.Router();
        var strategyName = "neAdminTokens";
        var populatePath = "";

        this.routesTemplate(router, passport, strategyName, neEditorTokens, populatePath);

        server.use('/admin/api/tokens/editor', router);

    },

//////////////////////////////
// neContentAdminTokens
//////////////////////////////

    neEditorStrategyConfig: function (passport){

        passport.use('neEditorTokens', new BearerStrategy(
            function (token, done) {
                neEditorTokens.findOne({'token': token}, function (err, tokenObject) {
                    if (err) {
                        return done(err);
                    }
                    if (!tokenObject) {
                        return done(null, false);
                    }
                    return done(null, tokenObject, {scope: 'all'});
                });
            }
        ));

    },


//////////////////////////////
// neUsers
//////////////////////////////




//////////////////////////////
//  Passport Strategies
//////////////////////////////

    localStrategyConfig: function (passport){

        passport.use('neLocal',new passportLocal(
            {
                usernameField: 'username',
                passwordField: 'password'
            },

            function(username, password, done) {
                neUsers.findOne({ "local.username": username }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    var validPassword = function (password){
                        if (user.local.password === password){
                            return true
                        }
                        else {
                            return false
                        }
                    };

                    if (validPassword(password) === false) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
            }
        ));

    },

    localStrategyRoutes: function (server, passport){

        var router = express.Router();

        router.post('/',

            passport.authenticate('neLocal',
                {
                    successRedirect: '/profile',
                    failureRedirect: '/login',
                    failureFlash: true
                }
            )
        );

        server.use('/login', router);

    },

    facebookStrategyConfig: function (passport){


    },

    facebookStrategyRoutes: function (passport, router){


    },

////////////////////////////////////////////////
// Passport Strategies for other ne Modules
////////////////////////////////////////////////

    handlers: function (){

        var gulp = require('gulp');
        var babel = require('gulp-babel');

        gulp.src('./tt.js')
            .pipe(babel())
            .pipe(gulp.dest('./app/'));

        return undefined

    },

//////////////////////////////
// routes Template
//////////////////////////////

    routesTemplate: function (router, passport, strategy, model, populatePath){

        // var router = express.Router();

        router.get('/',

            passport.authenticate(strategy, {session: false}),

            function(req, res){

            model
                .find()
                .populate(
                {path: populatePath}
                )
                .exec(function (err, doc) {
                    res.send(doc);
                });

        });

        router.get('/:_id',

            passport.authenticate(strategy, {session: false}),

            function(req, res){

            var f1 = '_id';
            var v1 = req.params._id;
            var q1 = {};
            q1[f1] = v1;

            model
                .find(
                q1
                )
                .sort(
                {_id: 1}
                )
                .skip(
                req.query.limit * req.query.batch
                )
                .limit(
                req.query.limit
                )
                .populate(
                {path: populatePath}
                )
                .exec(function (err, doc) {

                    res.send(doc);
                })

        });

        router.put('/:_id',

            passport.authenticate(strategy, {session: false}),

            function(req, res){

            var f1 = '_id';
            var v1 = req.params._id;
            var q1 = {};
            q1[f1] = v1;

            var config = {};
            config['multi'] = false;
            if (req.query.multi){
                config['multi'] = true;
            }

            console.log("--------------------");
            console.log("Put request received");

            var json = req.body;

            if (Object.keys(json).length === 0){
                console.log("No JSON request body found");
                console.log("Trying to use query params");

                var fs1 = req.query.fs1;
                var vs1 = req.query.vs1;
                var s1 = {};
                s1[fs1] = vs1;

                if (fs1 != null && vs1 != null) {
                    model
                        .update(
                            q1,
                            {
                                $set: s1
                            },
                            config
                        )
                        .exec(function (err, doc){
                            res.send(doc);
                        });
                    console.log("Put request executed using query params");
                    console.log("--------------------");
                }
                else if (fs1 != null ){
                    var msg = "ERROR: No fs1 query param specified";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }
                else if (vs1 != null ){
                    var msg = "ERROR: No vs1 query param specified";
                    console.error(msg);
                    res.send(msg);
                    console.log("--------------------");
                }

            }
            else if (Object.keys(json).length !== 0) {
                console.log("JSON request body object found");

                model
                    .update(
                        q1,
                        {
                            $set: json
                        },
                        config
                    )
                    .exec(function (err, doc){
                        res.send(doc);
                    });
                console.log("Put request executed using JSON request body object");
                console.log("--------------------");

            }
            else {
                var msg = "ERROR: Unknown reason";
                console.error(msg);
                res.send(msg);
                console.log("--------------------");
            }

        });

        router.delete('/:_id',

            passport.authenticate(strategy, {session: false}),

            function(req, res){

            var f1 = '_id';
            var v1 = req.params._id;
            var q1 = {};
            q1[f1] = v1;

            if (v1 != null) {
                model
                    .remove(
                        q1
                        )
                        .exec(function (err, doc){
                            if (err) return console.error(err);
                            res.send(f1 + ': ' + v1 + ' removed ' + doc);
                    })
            }
            else {
                console.log('Please specify a valid field value pair to find the item you want to delete')
            }

        });

        router.post('/',

            passport.authenticate(strategy, {session: false}),

            function(req, res){

            var obj = req.body;

            var newDoc = new model(obj);
            newDoc.save(function (err, newDoc){
                if (err) return console.error(err);
                res.send(newDoc)
            })

        });

        return router
    }
};

module.exports = nePassport;



/*

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
        passport.authenticate('neMongoRestStrategy', {session: false}),
        function(req, res){
            res.json({
                test: 'This is the data'
        })
    });

}

*/


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