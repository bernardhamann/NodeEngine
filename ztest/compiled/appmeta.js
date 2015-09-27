var appmeta = {

    config: {
        "neDataReqTimeoutTime": 5000,
        "neDataReqTimeoutMessage": "Not Authorized to view this content"
    },

    globals: {
        "APPNAME": "Node Engine Sample",
        "SITENAME": "Node Engine Sample",
        "DESCRIPTION": "A Example site for the Node Engine Approach"
    },

    paths: [

        {
            path: "/about",
            title: "About Us",
            description: "This is About Us page"
        },

        {
            path: "/contact",
            title: "Contact Us",
            description: "This is Contact Us page"
        }

    ]
};

module.exports = appmeta;

