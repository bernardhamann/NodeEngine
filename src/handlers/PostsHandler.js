import React from 'react';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

class PostsHandler extends React.Component {

    render() {
        var self = this;
        return (
            <body>
                <Header />
                <h2 id="main-title">This is the PostsHandler</h2>
                <p>id: {self.props.params.id}</p>
                <Footer />
            </body>
        )
    }
}

export default PostsHandler