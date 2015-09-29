var React = require('react');
var Header = require('../components/sections/Header');
var Footer = require('../components/sections/Footer');

var meta = {
        path: "/admin/users",
        title: "Users",
        description: "This is Users page",

        neDataBefore: 1,
        nedb1: {
            path: process.env.ROOTURL + "/admin/api/users?access_token=admin"
        }
};

var handler = React.createClass({

    render: function() {
        var self = this;

        console.log(self.props);

        var users;
        if (self.props.data.message){
            users = self.props.data.message;
        }
        else {
            users = self.props.data.nedb1.map((user, index)=>{
                return (
                    <p key={index}>
                        {user.profile.nameFirst} {user.profile.nameLast}
                        <br/>
                        {user.tokens.neEditor}
                        <br/>
                        {user.tokens.neAdmin}
                    </p>
                )
            });
        }

        return (
            <body>
                <Header {...self.props} />
                <h2 id="main-title">This is the Users Handler</h2>

                {users}


                <Footer />
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;