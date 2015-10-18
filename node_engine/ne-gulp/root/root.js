'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var handler = React.createClass({
    displayName: 'handler',

    render: function render() {

        console.log('');
        console.log('');
        console.log('aaRoot: this.props');
        console.log(this.props);
        console.log('');
        console.log('');

        var css;
        if (this.props.meta && this.props.meta.css) {
            css = this.props.meta.css.map(function (sheet, index) {
                return React.createElement('link', { rel: 'stylesheet', type: 'text/css', href: sheet });
            });
        } else {
            css = null;
        }

        return React.createElement(
            'html',
            { id: 'react-mount' },
            React.createElement(
                'head',
                null,
                React.createElement(
                    'title',
                    null,
                    this.props.meta.title + ' - ' + this.props.meta.appname
                ),
                React.createElement('meta', { name: 'description', content: this.props.meta.description }),
                React.createElement('link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css' }),
                React.createElement('link', { rel: 'stylesheet', href: '/style.css' }),
                css,
                React.createElement('meta', { charSet: 'UTF-8' }),
                React.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
                React.createElement('script', { src: 'http://html5shiv.googlecode.com/svn/trunk/html5.js' })
            ),
            React.createElement(RouteHandler, this.props),
            React.createElement(
                'div',
                null,
                React.createElement('script', { src: '/vendors.js' }),
                React.createElement('script', { src: '/bundle.js' })
            )
        );
    }
});

module.exports = handler;