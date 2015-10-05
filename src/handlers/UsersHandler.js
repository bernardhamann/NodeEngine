var React = require('react');
var neHandler = require('../ne-handler');
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
        if(self.props.data.nedb1){
            users = self.props.data.nedb1.map((user, index)=>{
                return (
                    <div key={index}>
                        {user.profile.name.displayName && <p>{user.profile.name.displayName}<br/></p> }
                        {user.tokens && user.tokens.neEditor && <p>{user.tokens.neEditor}<br/></p>}
                        {user.tokens && user.tokens.neAdmin && <p>{user.tokens.neAdmin}</p>}
                    </div>
                )
            });
        }



        return (
            <body>
                <Header {...self.props} />
                <h2 id="main-title">This is the Users Handler</h2>

                {neHandler.msg(self)}
                {users}

                <Footer />
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;