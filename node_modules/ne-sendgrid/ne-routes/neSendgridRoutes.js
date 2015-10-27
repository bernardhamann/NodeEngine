var express = require('express');
var neSendgrid = require('ne-sendgrid');

var router = express.Router();

var neSendgridContactFormRoute = function (server){

    router.get('/tt', function(req, res, next){

        res.send('Something')

    });

    router.post('/inbound', function(req, res, next){

        console.log(" ");
        console.log(" ");
        console.log("routes/contactForm req.body");
        console.log(req.body);
        console.log(" ");
        console.log(" ");

        var emailObject = {};

        emailObject.to = process.env.EMAIL;
        emailObject.subject = "Email from " + process.env.APPNAME;
        emailObject.detail = {};


        Object.getOwnPropertyNames(req.body).forEach(function (item, index, array) {

            console.log('neSendgrid Routes: item');
            console.log(item);

            if (item === "to"){
                console.log('neSendgrid Routes: set to');
                console.log(item);
                emailObject[item] = req.body[item]
            }
            else if (item === "from"){
                console.log('neSendgrid Routes: set from');
                console.log(item);
                emailObject[item] = req.body[item]
            }
            else if (item === "subject"){
                console.log('neSendgrid Routes: set subject');
                console.log(item);
                emailObject[item] = req.body[item]
            }
            else if (item === "body"){
                console.log('neSendgrid Routes: set content');
                console.log(item);
                emailObject[item] = req.body[item]
            }
            else if (item === "phone"){
                emailObject.detail.phone = req.body[item]
            }
            else if (item === "name"){
                emailObject.detail.name = req.body[item]
            }
            else{
                console.log("neSendgrid Routes Inbound: Skipped " + item + " on purpose becuase its not part of sendgrid email schema")
            }

        });

        console.log('neSendgrid Routes: emailObject');
        return neSendgrid.sendText(emailObject, res);



        /*
         neSendgrid.sendText({
         to: "name@mail.com",
         from: "name@mail.com",
         subject: "This is the subject 2",
         body: "This is the body 2"s
         });

         to:{type: String},
         from:{type: String},
         subject:{type: String},
         body:{type: String},
         */

    });

    server.use('/emails/sendgrid', router);

};

module.exports = neSendgridContactFormRoute;
