import React from 'react';

class Header extends React.Component {

    render(){
        var self = this;
        return (
            <header className="section" id="section-header">
                <div id="section-header-inner">
                    <h1>This is the Header</h1>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about" id="about-link">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/people">People</a></li>
                    </ul>
                </div>
            </header>
        )
    }
}

export default Header;