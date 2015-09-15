import React from 'react';

class Head extends React.Component {

    render(){

        return (
            <head>
                <title>{`${this.props.data.page.title} - ${this.props.data.globals.SITENAME}`}</title>
                <meta name="description" content={this.props.data.page.description}/>
                <link rel='stylesheet' href='/style.css' />
                <link href='http://fonts.googleapis.com/css?family=Holtwood+One+SC|Asap:400,700|Fjalla+One' rel='stylesheet' type='text/css' />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
            </head>
        )

    }
}

export default Head;











