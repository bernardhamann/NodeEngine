import React from 'react';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

class ContactHandler extends React.Component {

    render() {
        var self = this;
        return (
            <body>
                <Header />
                <h2 id="main-title">This is the ContactHandler</h2>
                <p>{self.props.meta.title}</p>
                <Footer />
            </body>

        )
    }
}

export default ContactHandler