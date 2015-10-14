var express = require('express');
var router = express.Router();
var axios = require('axios');

var neLocalStrategyRoutes = function (server){

    router.post('/change/*', function(req, res, next) {

        /*
            var userId = req.claims.user;

            if(checkPermissionsReturn([userId, 'admin'],req) === true) {
                next();
            }
            else {
                res.redirect('/login?message=AccessDenied:InsufficientPermissions').status(401);
            }

        */
        next();

    })

    router.post('/change/cycle/form', function(req, res, next){

        if (req.body.limit){
            if (req.body.batch){
                var redirectPath = '/admin/' + req.body.api + "?message=Page " + req.body.batch + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                return res.redirect(redirectPath);
            }
            else {
                var redirectPath = '/admin/' + req.body.api + "?message=Limit changed " + req.body.limit + "&limit=" + req.body.limit;
                return res.redirect(redirectPath);
            }
        }
        else{
            var redirectPath = '/admin/' + api + "?message=Error changing cycle";
            return res.redirect(redirectPath);
        }

    })

    router.post('/change/cycle/buttons', function(req, res, next){

        if (req.body.limit){
            if (req.body.batch){
                var redirectPath = '/admin/' + req.body.api + "?message=Page " + req.body.batch + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                return res.redirect(redirectPath);
            }
            else {
                var redirectPath = '/admin/' + req.body.api + "?limit=" + req.body.limit;
                return res.redirect(redirectPath);
            }
        }
        else{
            var redirectPath = '/admin/' + api + "?message=Error changing cycle";
            return res.redirect(redirectPath);
        }

    })

    router.post('/change/delete/', function(req, res, next){

        var apiPath = process.env.ROOTURL + '/api/' + req.body.api + "/" + req.body._id + "?token=" + req.cookies.token;

        axios.delete(apiPath)
            .then(function (response) {

                var redirectPath;
                if (req.body.limit){
                    redirectPath = '/admin/' + req.body.api + "?message=deleted" + "&limit=" + req.body.limit;
                    if (req.body.batch){
                        redirectPath = '/admin/' + req.body.api + "?message=deleted" + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                    }
                }
                else{
                    redirectPath = '/admin/' + req.body.api + "?message=deleted";
                }
                return res.redirect(redirectPath);

            })
            .catch(function (response) {

                var redirectPath = '/admin/' + req.body.api + '?message=' + "Error deleting ";
                return res.redirect(redirectPath);
            });

    })

    router.post('/change/add/', function(req, res, next){

        console.log("==============================================================================");
        console.log("==============================================================================");
        console.log("req.body");
        console.log(req.body);
        console.log("==============================================================================");
        console.log("==============================================================================");


        var postObject = {};

        Object.getOwnPropertyNames(req.body).forEach(function (item, index, array) {

            console.log(item);

            if (item === "limit"){

                console.log(" ")
                console.log(" ")
                console.log("Skipped limit on purpose")
                console.log(" ")
                console.log(" ")

            }

            else if (item === "batch"){

                console.log(" ")
                console.log(" ")
                console.log("Skipped batch on purpose")
                console.log(" ")
                console.log(" ")

            }

            else if (item === "api"){

                console.log(" ")
                console.log(" ")
                console.log("Skipped api on purpose")
                console.log(" ")
                console.log(" ")

            }

            else {
                postObject[item] = req.body[item]
            }

        })

        console.log("==============================================================================");
        console.log("==============================================================================");
        console.log("postObject");
        console.log(postObject);
        console.log("==============================================================================");
        console.log("==============================================================================");


        var apiPath = process.env.ROOTURL + '/api/' + req.body.api + "?token=" + req.cookies.token;

        console.log("==============================================================================");
        console.log("==============================================================================");
        console.log("apiPath");
        console.log("==============================================================================");
        console.log("==============================================================================");



        axios.post(apiPath, postObject)
            .then(function (response) {

                var redirectPath;
                if (req.body.limit){
                    redirectPath = '/admin/' + req.body.api + "?message=added" + "&limit=" + req.body.limit;
                    if (req.body.batch){
                        redirectPath = '/admin/' + req.body.api + "?message=added" + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                    }
                }
                else{
                    redirectPath = '/admin/' + req.body.api + "?message=added";
                }
                return res.redirect(redirectPath);


            })
            .catch(function (response) {

                var redirectPath;
                if (req.body.limit){
                    redirectPath = '/admin/' + req.body.api + "?message=Error adding" + "&limit=" + req.body.limit;
                    if (req.body.batch){
                        redirectPath = '/admin/' + req.body.api + "?message=Error adding" + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                    }
                }
                else{
                    redirectPath = '/admin/' + req.body.api + "?message=Error adding";
                }
                return res.redirect(redirectPath);

            });

    })

    router.post('/change/put/', function(req, res, next){

        console.log("==============================================================================");
        console.log("==============================================================================");
        console.log("req.body");
        console.log(req.body);
        console.log("==============================================================================");
        console.log("==============================================================================");

        console.log("neAdmin neAdminRoutes:  Post received");
        var api = req.body.api;
        console.log(api);
        var _id = req.body._id;
        console.log(_id);
        //var value = req.body.value;
        //console.log(value);
        var limit = req.body.limit;
        var batch = req.body.batch;

        var postObject = {};

        Object.getOwnPropertyNames(req.body).forEach(function (item, index, array) {

            console.log(item);

            if (item === "limit"){

                console.log(" ")
                console.log(" ")
                console.log("neAdmin neAdminRoutes: Skipped limit on purpose")
                console.log(" ")
                console.log(" ")

            }

            else if (item === "batch"){

                console.log(" ")
                console.log(" ")
                console.log("neAdmin neAdminRoutes: Skipped batch on purpose")
                console.log(" ")
                console.log(" ")

            }

            else if (item === "api"){

                console.log(" ")
                console.log(" ")
                console.log("neAdmin neAdminRoutes: Skipped api on purpose")
                console.log(" ")
                console.log(" ")

            }

            else {

                postObject[item] = req.body[item]

                console.log(" ")
                console.log(" ")
                console.log("neAdmin neAdminRoutes: postObject after " + item)
                console.log(postObject)
                console.log(" ")
                console.log(" ")

            }

        })

        var apiPath = process.env.ROOTURL + '/api/' + api + "/" + _id + "?token=" + req.cookies.token;

        console.log('');
        console.log('');
        console.log('neAdmin neAdminRoutes: apiPath');
        console.log(apiPath);
        console.log('');
        console.log('');


        axios.put(apiPath, postObject)
            .then(function (response) {

                console.log('');
                console.log('');
                console.log('neAdmin neAdminRoutes:  put successful');
                console.log(response);
                console.log('');
                console.log('');

                var redirectPath;
                if (req.body.limit){
                    if (req.body.batch){
                        redirectPath = '/admin/' + req.body.api + '?message=' + " updated" + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                    }
                    else{
                        redirectPath = '/admin/' + req.body.api + '?message=' + " updated" + "&limit=" + req.body.limit;
                    }
                }
                else{
                    redirectPath = '/admin/' + req.body.api + '?message=' + " updated to ";
                }
                return res.redirect(redirectPath);

            })
            .catch(function (response) {

                console.log('');
                console.log('');
                console.log('neAdmin neAdminRoutes:  put not successful');
                console.log(response);
                console.log('');
                console.log('');

                var redirectPath = '/admin/' + req.body.api + '?message=' + "Error updating ";
                return res.redirect(redirectPath);
            });
    });

    server.use('/admin', router);

};

module.exports = neLocalStrategyRoutes;
