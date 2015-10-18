var React = require('react');
var element = React.createElement;
var neHandler = require('ne-handler');
var _ = require("lodash");

var meta = {
    path: "/admin",
    title: "Admin page",
    description: "Add, edit, delete and view content",
    css: [
        "/ne-style.css",
        "/ne-admin/ne-css/style.css"
    ]
};

var handler = React.createClass({

    render: function() {
        var self = this;

        var dataRefIndex = _.findIndex(self.props.dataRef, function(chr) {
            return chr.name == self.props.meta.params.dataName;
        });

        console.log(self.props);

        var navTopLinks = []
        var dataLinks = [];

        self.props.dataRef.forEach(function(ref, index){

            if(ref.name === "negulpdatatest"){

                console.log("neAdmin naAdminApiEditHandler: datatest skipped on purpose")
            }
            else {
                navTopLinks.push(element(
                    'li',
                    {className: "ne-admin-nav-top-link"},
                    element(
                        'a',
                        {href: ref.slug + "?limit=3&batch=1"},
                        ref.name
                    )
                ))
            }

            dataLinks.push(element(
                'div',
                {className: "ne-ccol-3s ne-admin-link-box"},
                element(
                    'a',
                    {href: ref.slug + "?limit=3&batch=1"},
                    ref.name
                )
            ))

        })


        return (
            <body>

            <div className="ne-row-98 ne-tcenter ne-admin-nav-top">

                <div className="ne-admin-nav-top-profile">
                    <a href="/profile">{self.props.meta.claims && self.props.meta.claims.displayName && self.props.meta.claims.displayName}</a>
                </div>
                <div className="ne-admin-nav-top-links">
                    <ul>
                        <li className="ne-admin-nav-top-link"><a href="/">home</a></li>
                        <li className="ne-admin-nav-top-link"><a href="/admin">admin</a></li>
                        {navTopLinks}
                    </ul>
                </div>
                <div className="ne-admin-nav-top-profile">
                    <a href="/auth/logout">logout </a>
                </div>


            </div>

            <div className="ne-row-640">

                {dataLinks}

            </div>

            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;

