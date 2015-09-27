var React = require('react');
var Header = require('../components/sections/Header');
var Footer = require('../components/sections/Footer');

var meta = {
    path: "/login",
    title: "About Us",
    description: "This is About Us page"
};

var handler = React.createClass({

    render: function() {
        var self = this;

        console.log(self.props);

        var message;
        if (self.props.user){
            message = "You are already logged in"
        }
        else {
            message = "Please login"
        }

        return (
            <body>
            <Header {...self.props} />
            <h2 id="main-title">This is the Login Page</h2>

            {message}

            <form action="/login" method="post">
                <div>
                    <label>Username:</label>
                    <input type="text" name="username"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password"/>
                </div>
                <div>
                    <input type="submit" value="Log In"/>
                </div>
            </form>

            <Footer />
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;