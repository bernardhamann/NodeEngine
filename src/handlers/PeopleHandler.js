import React from 'react';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

class PeopleHandler extends React.Component {

    render() {
        var self = this;

        var people = self.props.data.nedb1.map((person, index)=>{
            return (
                <p key={index}>
                    {person.firstName} <br/>
                    {person.lastName}<br/>
                    {person.email}
                </p>
            )
        });

        return (
            <body>
                <Header />
                <h2 id="main-title">This is the PeopleHandler</h2>
                {people}
                <Footer />
            </body>
        )
    }
}

export default PeopleHandler