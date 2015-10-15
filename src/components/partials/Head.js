import React from 'react';

class Head extends React.Component {

    render(){

        if (this.props.meta && this.props.meta.css){
            var css = this.props.meta.css.map(function(sheet, index){
                return <link rel="stylesheet" type="text/css" href={sheet}/>
            });
        }
        else {
            var css = null
        }



        return (
            <head>
                <title>{`${this.props.meta.title} - ${this.props.meta.appname}`}</title>
                <meta name="description" content={this.props.meta.description}/>
                <link rel='stylesheet' href='/style.css' />
                {css}
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
            </head>
        )
    }
}

export default Head;