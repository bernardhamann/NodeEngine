import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

class ContactHandler extends React.Component {

    render() {
        var self = this;
        return (
            <body>
                <Header />
                <h2 id="main-title">This is the ContactHandler</h2>
                <p>{self.props.data.page.title}</p>
                <Footer />
            </body>

        )
    }
}

export default ContactHandler