import React from 'react';
import {Router, RouteHandler } from 'react-router';
import Head from '../partials/Head';
import Foot from '../partials/Foot';


class MainHandler extends React.Component {

    render() {
        return (
            <html id="react-mount">
                <Head {...this.props} />
                <RouteHandler {...this.props}  />
                <Foot />
            </html>
        )
    }
}

export default MainHandler;