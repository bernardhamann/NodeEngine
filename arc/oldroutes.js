var express = require('express');
var router = express.Router();
var fs = require('fs');
var React = require('react/addons');
var path = require('path');


router.get('/contact', function(req, res, next) {
    // res.render('index', { title: 'About server rendered' });
    res.send('Contact Route from Router Server');
});


router.get('/:slug', function(req, res, next) {

    var reqSlug = req.params.slug;

    console.log(reqSlug);
    var reqSlugUrl = "./build/components/pages/" + reqSlug + ".js";
    console.log(reqSlugUrl);

    fs.stat(reqSlugUrl, function(err, stat) {
        // Check if there is a component for that page
        if(err == null) {
            // If there is require that component
            console.log('File exists');

            // Create the url to the component code for the require
            //var reactLayout = React.createFactory(require('../components/pages/main.js'));
            var reactUrl = "../components/pages/" + reqSlug + ".js";

            // Use the url to the component to require the component
            var reactLayout = React.createFactory(require(reactUrl));
            console.log(reactLayout);

            // render the component to a string
            //  i think its best to no send any props from here and rather handle all the props sending from                the page file or database

            var reactHtml = React.renderToStaticMarkup(reactLayout({ name: "Loading", number: ". . ." }));

            console.log(reactHtml);

            // Add the HTML doctype to the react rendered string
            var htmlDoctype = "<!doctype html>"
            var reactHtmlDoctype = htmlDoctype.concat(reactHtml);
            console.log(reactHtmlDoctype);

            // delete the static file
            // - this can wait for now since the user will not hit this route if there is a static file

            // create the new empty static file and the directory
            // var dir = "./build/static/main";
            var dirUrl = "./build/static/" + reqSlug;
            if (!fs.existsSync(dirUrl)) {
                // Create the directory
                fs.mkdirSync(dirUrl);
                console.log('Directory Created');

                //create the file
                var fileUrl = "./build/static/" + reqSlug + "/index.html";
                fs.writeFile(fileUrl, 'New File', function (err) {
                    if (err) throw err;
                    console.log('File Created');
                });

                // write the rendered html to the static file
                // fs.writeFile('./build/static/main/index.html', reactHtml);
                fs.writeFile(fileUrl, reactHtmlDoctype);


                //RENDER THE NEW page on a timer to give time for the page to be created
                var renderRedirectTimer = setInterval(function(){ renderRedirect() }, 500);
                function renderRedirect() {
                    console.log("Timer is running");

                    //res.send('Please Reload the page');
                    var options = {
                        root: './build/static/' + reqSlug,
                        dotfiles: 'deny',
                        headers: {
                            'x-timestamp': Date.now(),
                            'x-sent': true
                        }
                    };
                    var filename = "index.html";
                    res.sendFile(filename, options, function (err) {
                        if (err) {
                            console.log(err);
                            res.status(err.status).end();
                        }
                        else {
                            console.log('Sent:', filename);
                        }
                    });

                    console.log("Timer is running no more");
                    clearInterval(renderRedirectTimer);
                }

            }


        } else if(err.code == 'ENOENT') {
            console.log('File does not exist');
            console.log('Checking database ');
            res.send('Index from server');

        } else {
            console.log('Some other error: ', err.code);
            console.log('No record in the files or database sending 404 response');
            res.send('404 - Page not found');
        }
    });


});

router.get('/:slug/:slug2', function(req, res, next) {
    var reqSlug = req.params.slug;
    var reqSlug2 = req.params.slug2;

    console.log(reqSlug);
    console.log(reqSlug2);


    res.send(reqSlug + reqSlug2 );

});


router.get('/:slug/:slug2/:slug3', function(req, res, next) {
    var reqSlug = req.params.slug;
    var reqSlug2 = req.params.slug2;
    var reqSlug3 = req.params.slug3;

    console.log(reqSlug);
    console.log(reqSlug2);
    console.log(reqSlug3);

    res.send(reqSlug + reqSlug2 + reqSlug3);

});