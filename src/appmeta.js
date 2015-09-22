var appmeta = {

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
        },

        {
            path: "/people",
            title: "People",
            description: "This is People page",

            nedBefore:
            {
                number: 1,
                nedb1:
                {
                    path: process.env.ROOTURL + "/api/people"
                }
            }
        },

        {
            path: "/something",
            title: "Something",
            description: "This is Something",

            nedCustom:
            {
                call:  "something"
            },
            nedCycle:
            {
                call:  "something"
            }
        }

    ],

    custom: function(meta, req){

        console.log('meta in custom at trans');
        console.log(meta);

        switch (meta.nedCustom.call){
            case 'something':
                console.log('something case matched');
                return this.something(meta, req);
        }
    },

    something: function (meta, req){

        // Example usage can be to use the req.params to change the meta title

        meta.title = "Dynamic Title for " + req.path;
        console.log('Do something with the routeMeta object before sending it back');
        return meta

    }
};

module.exports = appmeta;

