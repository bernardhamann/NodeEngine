var React = require('react');
var Header = require('../components/sections/Header');
var Footer = require('../components/sections/Footer');

var meta = {
    path: "/",
    title: "Home",
    description: "Home"
};

var handler = React.createClass({

    render: function() {
        var self = this;

        var text = this.props.apiref.map(function(item, index){
            return (
                <li key={index}><a href={item.slug}>{item.name}</a>  </li>
                )
        });

        return (
            <body>
                <Header {...self.props} />
                <ul>
                    {text}
                </ul>
                <h1 id="main-title">This is the IndexHandler</h1>
                <h2>{self.props.meta.title}</h2>
                <Footer />
            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;