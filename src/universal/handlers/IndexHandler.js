import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

class IndexHandler extends React.Component {

    render() {
        var self = this;
        return (
            <body>
                <Header />
                <h1 id="main-title">This is the IndexHandler</h1>
                <h2>{self.props.meta.title}</h2>
                <Footer />
            </body>
        )
    }
}

export default IndexHandler