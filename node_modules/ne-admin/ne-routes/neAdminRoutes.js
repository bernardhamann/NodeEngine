var express = require('express');
var axios = require('axios');

var router = express.Router();

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

    });

    router.post('/change/cycle/form', function(req, res, next){

        var redirectPath
        if (req.body.limit){
            if (req.body.batch){
                redirectPath = '/admin/' + req.body.data + "?limit=" + req.body.limit + "&batch=" + req.body.batch;
            }
            else {
                redirectPath = '/admin/' + req.body.data + "?limit=" + req.body.limit;
            }
        }
        else{
            redirectPath = '/admin/' + data + "?message=Error changing cycle";
        }
        return res.redirect(redirectPath);

    });

    router.post('/change/cycle/buttons', function(req, res, next){

        var redirectPath
        if (req.body.limit){
            if (req.body.batch){
                redirectPath = '/admin/' + req.body.data + "?limit=" + req.body.limit + "&batch=" + req.body.batch;
            }
            else {
                redirectPath = '/admin/' + req.body.data + "?limit=" + req.body.limit;
            }
        }
        else{
            redirectPath = '/admin/' + data + "?message=Error changing cycle";
        }
        return res.redirect(redirectPath);

    });

    router.post('/change/delete/', function(req, res, next){

        var dataPath = process.env.ROOTURL + '/data/' + req.body.data + "/" + req.body._id + "?token=" + req.cookies.token;

        axios.delete(dataPath)
            .then(function (response) {

                var redirectPath;
                if (req.body.limit){
                    redirectPath = '/admin/' + req.body.data + "?message=deleted" + "&limit=" + req.body.limit;
                    if (req.body.batch){
                        redirectPath = '/admin/' + req.body.data + "?message=deleted" + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                    }
                }
                else{
                    redirectPath = '/admin/' + req.body.data + "?message=deleted";
                }
                return res.redirect(redirectPath);

            })
            .catch(function (response) {

                var redirectPath = '/admin/' + req.body.data + '?message=' + "Error deleting ";
                return res.redirect(redirectPath);
            });

    });

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

            else if (item === "data"){

                console.log(" ")
                console.log(" ")
                console.log("Skipped data on purpose")
                console.log(" ")
                console.log(" ")

            }

            else {
                postObject[item] = req.body[item]
            }

        });

        console.log("==============================================================================");
        console.log("==============================================================================");
        console.log("postObject");
        console.log(postObject);
        console.log("==============================================================================");
        console.log("==============================================================================");


        var dataPath = process.env.ROOTURL + '/data/' + req.body.data + "?token=" + req.cookies.token;

        console.log("==============================================================================");
        console.log("==============================================================================");
        console.log("dataPath");
        console.log("==============================================================================");
        console.log("==============================================================================");



        axios.post(dataPath, postObject)
            .then(function (response) {

                var redirectPath;
                if (req.body.limit){
                    redirectPath = '/admin/' + req.body.data + "?message=added" + "&limit=" + req.body.limit;
                    if (req.body.batch){
                        redirectPath = '/admin/' + req.body.data + "?message=added" + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                    }
                }
                else{
                    redirectPath = '/admin/' + req.body.data + "?message=added";
                }
                return res.redirect(redirectPath);


            })
            .catch(function (response) {

                var redirectPath;
                if (req.body.limit){
                    redirectPath = '/admin/' + req.body.data + "?message=Error adding" + "&limit=" + req.body.limit;
                    if (req.body.batch){
                        redirectPath = '/admin/' + req.body.data + "?message=Error adding" + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                    }
                }
                else{
                    redirectPath = '/admin/' + req.body.data + "?message=Error adding";
                }
                return res.redirect(redirectPath);

            });

    });

    router.post('/change/put/', function(req, res, next){

        console.log("==============================================================================");
        console.log("==============================================================================");
        console.log("neAdmin neAdminRoutes: req.body");
        console.log(req.body);
        console.log("==============================================================================");
        console.log("==============================================================================");

        console.log("neAdmin neAdminRoutes:  Post received");
        var data = req.body.data;
        var _id = req.body._id;
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

            else if (item === "data"){

                console.log(" ")
                console.log(" ")
                console.log("neAdmin neAdminRoutes: Skipped data on purpose")
                console.log(" ")
                console.log(" ")

            }

            else if (item === "_id"){

                console.log(" ")
                console.log(" ")
                console.log("neAdmin neAdminRoutes: Skipped _id on purpose")
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

        });

        var dataPath = process.env.ROOTURL + '/data/' + req.body.data + "/" + req.body._id + "?token=" + req.cookies.token;

        console.log('');
        console.log('');
        console.log('neAdmin neAdminRoutes: dataPath');
        console.log(dataPath);
        console.log('');
        console.log('');

        axios.put(dataPath, postObject)
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
                        redirectPath = '/admin/' + req.body.data + '?message=' + " updated" + "&limit=" + req.body.limit + "&batch=" + req.body.batch;
                    }
                    else{
                        redirectPath = '/admin/' + req.body.data + '?message=' + " updated" + "&limit=" + req.body.limit;
                    }
                }
                else{
                    redirectPath = '/admin/' + req.body.data + '?message=' + " updated to ";
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

                var redirectPath = '/admin/' + req.body.data + '?message=' + "Error updating ";
                return res.redirect(redirectPath);
            });
    });

    server.use('/admin', router);

};

module.exports = neLocalStrategyRoutes;
