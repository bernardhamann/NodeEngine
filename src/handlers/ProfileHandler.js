var React = require('react');
var Header = require('../components/sections/Header');
var Footer = require('../components/sections/Footer');

var meta = {
    path: "/profile",
    title: "About Us",
    description: "This is About Us page"
};

var handler = React.createClass({


    render: function() {
        var self = this;

        console.log(self.props);

        var users;
        if (self.props.user && self.props.user.profile.nameFirst){
            var name = self.props.user.profile.nameFirst;
            users = (
                <div>
                    <p>Welcome {name} </p>
                </div>
            )
        }
        else {
            users = (
                <div>
                    <p>Please login to view your profile page</p>
                </div>
            )
        }

        return (
            <body>
            <Header {...self.props} />
            <h2 id="main-title">This is the Profile Handler</h2>

            {users}


            <Footer />
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;