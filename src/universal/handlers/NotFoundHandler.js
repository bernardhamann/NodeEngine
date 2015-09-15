import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

class NotFoundHandler extends React.Component {

    render() {
        return (
            <body>
                <Header />
                <h1 id="main-title">Route not Found</h1>
                <Footer />
            </body>
        )
    }
}

export default NotFoundHandler