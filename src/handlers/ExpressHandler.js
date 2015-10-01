var React = require('react');
var Head = require('../components/partials/Head');
var Foot = require('../components/partials/Foot');
var Header = require('../components/sections/Header');
var Footer = require('../components/sections/Footer');

var meta = {
    path: "/express",
    title: "About Us",
    description: "This is About Us page"
};

var handler = React.createClass({

    /*
    constructor(props){
        super(props);
        this.state = {
            title: "Express",
            name: "Name from Express Handler State"
        }
    }
    */

    componentDidMount: function () {
        console.log('ExpressHandler Mounted');
    },

    render: function() {
        var self = this;
        return (
            <html id="react-mount">
                <Head title={self.state.title} siteName={self.props.globals.appname} />
                <body>
                    <Header {...self.props} />
                    <h2 id="main-title">This is the Express Handler</h2>
                    <Footer />
                </body>
                <Foot />
            </html>
        )
    }
});

/*

handler.propTypes = {
    title: React.PropTypes.string,
    siteName: React.PropTypes.string
};

handler.defaultProps = {
    siteName: "Sitename"
};

*/

exports.handler = handler;
exports.meta = meta;