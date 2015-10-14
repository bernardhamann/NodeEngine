var React = require('react');
var element = React.createElement;
var neHandler = require('ne-handler');
var _ = require("lodash");

var meta = {
    path: "/admin/:apiName",
    title: "Admin page",
    description: "Add, edit, delete and view content",
    nerbArray: [
        {
            nerbName: 'apiData',
            pathFunction: function (meta) {
                if(meta.query){
                    if(meta.query.limit){
                        if(meta.query.batch){
                            var path = process.env.ROOTURL + "/api/" + meta.params.apiName + "?limit=" + meta.query.limit + "&batch=" + meta.query.batch;
                        }
                        else{
                            var path = process.env.ROOTURL + "/api/" + meta.params.apiName + "?limit=" + meta.query.limit;
                        }
                    }
                    else{
                        var path = process.env.ROOTURL + "/api/" + meta.params.apiName;
                    }
                }
                else {
                    var path = process.env.ROOTURL + "/api/" + meta.params.apiName;
                }
                return path
            }
        }
    ]
};

var handler = React.createClass({

    render: function() {
        var self = this;

        var apirefIndex = _.findIndex(self.props.apiref, function(chr) {
            return chr.name == self.props.meta.params.apiName;
        });

        console.log(self.props);


        /////////////////////////////////////////
        // Cycle form
        /////////////////////////////////////////


        var cycleForm;
        if (self.props.meta.query.limit){

            cycleForm = element(
                "form",
                { action: "/admin/change/cycle/form", method: "post" },
                element(
                    'input',
                    {type: "hidden", name: "api", value: self.props.meta.params.apiName,}
                ),
                element(
                    'label',
                    {},
                    "Items per page"
                ),
                element(
                    'input',
                    {type: "text", name: "limit", value: self.props.meta.query.limit}
                ),
                element(
                    'label',
                    {},
                    "Page number"
                ),
                element(
                    'input',
                    {type: "text", name: "batch", value: self.props.meta.query.batch,}
                ),
                element(
                    "input",
                    { type: "submit" , value: "Go"}
                )
            )

        }
        else {
            cycleForm = "Error loading cycle form"
        }


        /////////////////////////////////////////
        // Cycle Buttons
        /////////////////////////////////////////

        var cycleButtons;
        if (self.props.meta.query.batch){

            var downCycle;
            var downCycleTest = parseInt(self.props.meta.query.batch) - 1

            if (downCycleTest > 0){
                downCycle = element(
                    "input",
                    { type: "submit" , value: downCycleTest}
                )
            }
            else {
                downCycle = element(
                    "label",
                    {},
                    ""
                )
            }

            cycleButtons = element(
                "div",
                {
                    style:{
                        textAlign: "center"
                    }
                },
                element(
                    "form",
                    { action: "/admin/change/cycle/buttons", method: "post" },
                    element(
                        'input',
                        {type: "hidden", name: "api", defaultValue: self.props.meta.params.apiName}
                    ),
                    element(
                        'input',
                        {type: "hidden", name: "limit", defaultValue: self.props.meta.query.limit}
                    ),
                    element(
                        'input',
                        {type: "hidden", name: "batch", defaultValue: parseInt(self.props.meta.query.batch) - 1}
                    ),
                    downCycle
                ),
                element(
                    "form",
                    { action: "/admin/change/cycle/buttons", method: "post" },
                    element(
                        'label',
                        {},
                        parseInt(self.props.meta.query.batch)
                    )

                ),
                element(
                    "form",
                    { action: "/admin/change/cycle/buttons", method: "post" },
                    element(
                        'input',
                        {type: "hidden", name: "api", defaultValue: self.props.meta.params.apiName}
                    ),
                    element(
                        'input',
                        {type: "hidden", name: "limit", defaultValue: self.props.meta.query.limit}
                    ),
                    element(
                        'input',
                        {type: "hidden", name: "batch", defaultValue: parseInt(self.props.meta.query.batch) + 1}
                    ),
                    element(
                        "input",
                        { type: "submit" , value: parseInt(self.props.meta.query.batch) + 1 }
                    )
                )
            )
        }
        else {
            cycleButtons = "Error loading cycle buttons"
        }


        /////////////////////////////////////////
        // Items
        /////////////////////////////////////////

        var items;
        if (self.props.data.apiData){

            if (self.props.data.apiData.length === 0){
                items = element(
                    'div',
                    {
                        style: {
                            background: "red",
                            margin: "20px",
                            padding: "20px",
                            textAlign: "center"
                        }
                    },
                    element(
                        'p',
                        {
                            style: {
                                color: "white"
                            }
                        },
                        "There is no content on this page"
                    )
                )
            }
            else {


                /////////////////////////////////////////
                // Edit Items
                /////////////////////////////////////////

                items = self.props.data.apiData.map(function (object, index){

                    console.log(" ")
                    console.log(" ")
                    console.log("object")
                    console.log(object)
                    console.log(" ")
                    console.log(" ")

                    var flatObject = neHandler.flattenObject(object);

                    console.log(" ")
                    console.log(" ")
                    console.log("flatObject")
                    console.log(flatObject)
                    console.log(" ")
                    console.log(" ")

                    /////////////////////////////////////////
                    // Delete Items
                    /////////////////////////////////////////

                    var deleteItem = element(
                        "form",
                        { action: "/admin/change/delete/", method: "post" },
                        element(
                            'input',
                            {type: "hidden", name: "limit", defaultValue: self.props.meta.query.limit}
                        ),
                        element(
                            'input',
                            {type: "hidden", name: "batch", defaultValue: self.props.meta.query.batch}
                        ),
                        element(
                            'input',
                            {type: "hidden", name: "api", defaultValue: self.props.meta.params.apiName}
                        ),
                        element(
                            'input',
                            {type: "hidden", name: "_id", defaultValue: object._id,}
                        ),
                        element(
                            'br',
                            {}
                        ),
                        element(
                            'br',
                            {}
                        ),
                        element(
                            "input",
                            { type: "submit" , value: "Delete Item", style: {
                                background:'red',
                                color: 'white'
                            }}
                        )
                    )

                    var editItem = [];

                    self.props.apiref[apirefIndex].fields.forEach(function(field, index2){


                        /////////////////////////////////////////
                        // Edit Items
                        /////////////////////////////////////////

                        editItem.push(element(
                            'div',
                            {id: index2, key: index2},
                            element(
                                "form",
                                { action: "/admin/change/put/", method: "post" },
                                element(
                                    'input',
                                    {type: "hidden", name: "limit", defaultValue: self.props.meta.query.limit}
                                ),
                                element(
                                    'input',
                                    {type: "hidden", name: "batch", defaultValue: self.props.meta.query.batch}
                                ),
                                element(
                                    'input',
                                    {type: "hidden", name: "api", defaultValue: self.props.meta.params.apiName}
                                ),
                                element(
                                    'input',
                                    {type: "hidden", name: "_id", defaultValue: flatObject._id}
                                ),
                                element(
                                    'label',
                                    {},
                                    field + " -> "
                                ),
                                element(
                                    'br',
                                    {}
                                ),
                                element(
                                    "input",
                                    { type: "text", name: field, placeholder: flatObject[field]}
                                ),
                                element(
                                    'br',
                                    {}
                                ),
                                element(
                                    "input",
                                    { type: "submit" , value: "Change " + field}
                                )
                            )
                        ))

                    })

                    return element(
                        "div",
                        {
                            key: index ,
                            style: {
                                background: "grey",
                                color: "black",
                                margin: "20px",
                                padding: "20px",
                                textAlign: "center"
                            }
                        },
                        editItem,
                        deleteItem
                    )
                });


            }
        }
        else {
            items = "Error"
        }

        /////////////////////////////////////////
        // Add Items
        /////////////////////////////////////////

        var addItemFields = [];

        addItemFields.push(element(
            'input',
            {type: "hidden", name: "limit", defaultValue: self.props.meta.query.limit}
        ))
        addItemFields.push(element(
            'input',
            {type: "hidden", name: "batch", defaultValue: self.props.meta.query.batch}
        ))
        addItemFields.push(element(
            'input',
            {type: "hidden", name: "api", defaultValue: self.props.meta.params.apiName}
        ))

        self.props.apiref[apirefIndex].fields.forEach(function(field, index){

            addItemFields.push(element(
                'label',
                {},
                field
            ))
            addItemFields.push(element(
                'br',
                {}
            ))
            addItemFields.push(element(
                "input",
                { type: "text", name: field, placeholder: field}
            ))
            addItemFields.push(element(
                'br',
                {}
            ))

        })

        var addItem = element(
            "div",
            {
                style: {
                    background: "green",
                    color: "white",
                    margin: "20px",
                    padding: "20px",
                    textAlign: "center"
                }
            },
            element(
                "form",
                {   action: "/admin/change/add/",
                    method: "post"
                },
                addItemFields,
                element(
                    "input",
                    { type: "submit" , value: "Add Item",
                        style: {
                            background:'white',
                            color: 'black'
                        }
                    }
                )
            )
        )



        return (
            <body>

                <div>

                    <h2> page number </h2>

                    <div style={
                    {
                        background: "black",
                        color: "white",
                        margin:'20px',
                        padding:'20px',
                        textAlign: "center"
                    }
                    }>{self.props.meta.query.message && self.props.meta.query.message} </div>

                    {cycleButtons}

                </div>

                <div>

                    <h2> {self.props.meta.params.apiName} items </h2>

                    {cycleForm}

                    {items}

                    {cycleForm}

                    <h2> add new {self.props.meta.params.apiName} item </h2>

                    {addItem}

                </div>






            </body>
        )
    }
});

exports.handler = handler;
exports.meta = meta;


/*
  <form action="/super" method="post">
        <div>
            <label>neSuper Token:</label>
            <input type="text" name="super_token"/>
        </div>
        <div>
            <label>neAdmin Token:</label>
            <input type="text" placeholder="user.tokens.neAdmin.token" name="admin_token"/>
        </div>
        <div>
            <input type="submit" value="Submit"/>
        </div>
  </form>
*/