var React = require('react');
var Header = require('../components/sections/Header');
var Footer = require('../components/sections/Footer');

var meta = {
    path: "/people",
    title: "People",
    description: "This is People page",
    neDataBefore: 1,
    nedb1: {
        path: process.env.ROOTURL + "/api/people",
        pathFunction: function (meta) {
            if (meta.params._id){
                path = process.env.ROOTURL + "/api/people" + "/" + meta.params._id;
            }else {
                var path = process.env.ROOTURL + "/api/people";
            }
            return path
        },
        cycle: false,
        search: false
    },
    cycle: {
        limit: "query.limit",
        batch: "query.batch"
    },
    search: {
        field1: "query.limit",
        value2: "query.batch"
    }

};


var handler = React.createClass({

    render: function() {
        var self = this;

        // var dd = self.props.data.nedb1.func();

        var people;
        if (self.props.data.message){

            people = self.props.data.message;

        }
        else {
            people = self.props.data.nedb1.map((person, index)=>{
                return (
                    <p key={index}>
                        {person.nameFirst} <br/>
                    </p>
                )
            });
        }
        return (
            <body>
                <Header {...self.props} />
                <h2 id="main-title">This is the People Handler</h2>
                {people}
                <Footer />
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;