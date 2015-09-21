import React from 'react';
import config from '../../config.js';
import Head from '../components/partials/Head';
import Foot from '../components/partials/Foot';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';


class ExpressHandler extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: "Express",
            name: "Name from Express Handler State"
        }
    }

    static componentDidMount() {
        console.log('ExpressHandler Mounted');
    }

    render() {
        var self = this;
        return (
            <html id="react-mount">
                <Head title={self.state.title} siteName={self.props.siteName} />
                <body>
                    <Header />
                    <h2 id="main-title">This is the ExpressHandler</h2>
                    <p>{self.state.name}</p>
                    <Footer />
                </body>
                <Foot />
            </html>
        )
    }
}

ExpressHandler.propTypes = {
    title: React.PropTypes.string,
    siteName: React.PropTypes.string
};

ExpressHandler.defaultProps = {
    siteName: config.SITENAME
};

export default ExpressHandler