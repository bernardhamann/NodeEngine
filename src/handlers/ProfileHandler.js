var React = require('react');
var Header = require('../components/sections/Header');
var Footer = require('../components/sections/Footer');

var meta = {
    path: "/profile",
    title: "Profile Page",
    description: "User profile page"
};

var handler = React.createClass({


    render: function() {
        var self = this;

        console.log(self.props);

        var facebook;
        if (self.props.user){
            if(self.props.user.facebook.active === false){

                facebook = (
                    <div>
                        <h3>Facebook</h3>
                        <p>You are not connected to facebook</p>
                    </div>
                )
            }
            else {
                var facebookId = self.props.user.facebook.id;
                var facebookToken = self.props.user.facebook.token;
                facebook = (
                    <div>
                        <h3>Facebook</h3>

                        <p>Id: <br/>{facebookId}</p>

                        <p>Token: <br/>{facebookToken}</p>
                    </div>
                )
            }
        }
        var profile;
        if (self.props.user && self.props.user.profile.name.displayName){
            var name = self.props.user.profile.name.displayName;
            profile = (
                <div>
                    <p>Welcome {name} </p>
                    {facebook}
                </div>
            )
        }
        else {
            profile = (
                <div>
                    <p>Please login to view your profile page</p>
                </div>
            )
        }
        return (
            <body>
            <Header {...self.props} />
            <h2 id="main-title">This is the Profile Handler</h2>

            {profile}

            <Footer />
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;