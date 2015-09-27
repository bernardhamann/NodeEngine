var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Head = require('../components/partials/Head');
var Foot = require('../components/partials/Foot');

var handler = React.createClass({

    render: function() {
        return (
            <html id="react-mount">
            <Head {...this.props} />
            <RouteHandler {...this.props}  />
            <Foot />
            </html>
        )
    }
});

module.exports = handler;