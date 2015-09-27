var React = require('react');
var Header = require('../components/sections/Header');
var Footer = require('../components/sections/Footer');

var meta = {
    path: "/",
    title: "About Us",
    description: "This is About Us page"
};

var handler = React.createClass({

    render: function() {
        var self = this;
        return (
            <body>
                <Header {...self.props} />
                <h1 id="main-title">This is the IndexHandler</h1>
                <h2>{self.props.meta.title}</h2>
                <Footer />
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;