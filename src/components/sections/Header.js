import React from 'react';

class Header extends React.Component {

    render(){
        var self = this;
        console.log(self.props);

        var user;
        if (self.props.user){
            var text = self.props.user.profile.name.displayName;
            user =
                <ul>
                    <li><a href="/profile">{text}</a></li>
                    <li><a href="/admin">admin home</a></li>
                    <li><a href="/admin/users"> Users</a></li>
                    <li><a href="/admin/tokens"> Tokens</a></li>
                </ul>
        }
        else {
            user =
                <ul>
                    <li><a href="/login">Login</a></li>
                </ul>
        }


        return (
            <header className="section" id="section-header">
                <div id="section-header-inner">
                    <h1>This is the Header</h1>
                    <div>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about" id="about-link">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/people">People</a></li>
                        </ul>
                    </div>
                    <div>
                        {user}
                    </div>

                </div>
            </header>
        )
    }
}

export default Header;