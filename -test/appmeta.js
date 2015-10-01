var appmeta = {

    paths: [

        {
            path: "/something",
            title: "Something",
            description: "This is Something",

            neDataCustom:
            {
                call:  "something"
            },
            neDataCycle:
            {
                call:  "something"
            }
        }

    ],

    custom: function(meta, req){

        console.log('meta in custom at trans');
        console.log(meta);

        switch (meta.neDataCustom.call){
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

