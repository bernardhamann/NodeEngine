import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

class NotFoundHandler extends React.Component {

    render() {
        var self = this;
        return (
            <body>
                <Header />
                <h1 id="main-title">Route not Found</h1>
                <p>{self.props.meta.title}</p>
                <Footer />
            </body>
        )
    }
}

export default NotFoundHandler