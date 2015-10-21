var React = require('react');
var neHandler = require('ne-handler');
var _ = require("lodash");


var element = React.createElement;

var meta = {
    path: "/admin/:dataName",
    title: "Admin page",
    description: "Add, edit, delete and view content",
    css: [
        "/ne-style.css",
        "/neAdminStyle.css"
    ],
    nerbArray: [
        {
            nerbName: 'adminData',
            pathFunction: function (meta) {
                if(meta.query){
                    if(meta.query.limit){
                        if(meta.query.batch){
                            var path = process.env.ROOTURL + "/data/" + meta.params.dataName + "?limit=" + meta.query.limit + "&batch=" + meta.query.batch;
                        }
                        else{
                            var path = process.env.ROOTURL + "/data/" + meta.params.dataName + "?limit=" + meta.query.limit;
                        }
                    }
                    else{
                        var path = process.env.ROOTURL + "/data/" + meta.params.dataName;
                    }
                }
                else {
                    var path = process.env.ROOTURL + "/data/" + meta.params.dataName;
                }
                return path
            }
        }
    ]
};

var handler = React.createClass({

    render: function() {
        var self = this;

        var dataRefIndex = _.findIndex(self.props.dataRef, function(chr) {
            return chr.name == self.props.meta.params.dataName;
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
                    {type: "hidden", name: "data", value: self.props.meta.params.dataName,}
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
                    { type: "submit" , value: downCycleTest, className: "ne-admin-btn pagebutton"}
                )
            }
            else {
                downCycle = element(
                    "label",
                    {},
                    ""
                )
            }

            var cyclePreviousButton = element(
                "form",
                { action: "/admin/change/cycle/buttons", method: "post"},
                element(
                    'input',
                    {type: "hidden", name: "data", defaultValue: self.props.meta.params.dataName}
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
            )

            var cycleCurrentLabel = element(
                'label',
                {},
                "Page " + parseInt(self.props.meta.query.batch)
            )

            var cycleNextButton = element(
                "form",
                { action: "/admin/change/cycle/buttons", method: "post" },
                element(
                    'input',
                    {type: "hidden", name: "data", defaultValue: self.props.meta.params.dataName}
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
                    { type: "submit" , value: parseInt(self.props.meta.query.batch) + 1, className: "ne-admin-btn pagebutton"}
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
        if (self.props.data.adminData){

            if (self.props.data.adminData.length === 0){
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

                items = self.props.data.adminData.map(function (object, index){

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
                            {type: "hidden", name: "data", defaultValue: self.props.meta.params.dataName}
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
                            "button",
                            {type: "submit", className: "ne-admin-btn ne-admin-item-delete-button"},
                            "Delete item"
                        )
                    )


                    /////////////////////////////////////////
                    // Edit Items
                    /////////////////////////////////////////

                    var editItem = [];

                    self.props.dataRef[dataRefIndex].fields.forEach(function(field, index2){

                        if(field.type && field.type === "ObjectId"){

                            editItem.push(element(
                                'div',
                                {id: index2, key: index2, className: "ne-admin-item-field-edit-form"},
                                element(
                                    'label',
                                    {},
                                    field.data + " -> "
                                ),
                                element(
                                    'br',
                                    {}
                                ),
                                element(
                                    "label",
                                    {},
                                    flatObject[field.data]
                                )
                            ))

                        }

                        else if(field.type && field.type === "noEdit"){

                            editItem.push(element(
                                'div',
                                {id: index2, key: index2, className: "ne-admin-item-field-edit-form"},
                                element(
                                    'label',
                                    {},
                                    field.data + " -> "
                                ),
                                element(
                                    'br',
                                    {}
                                ),
                                element(
                                    "label",
                                    {},
                                    flatObject[field.data]
                                )
                            ))

                        }

                        else{

                            editItem.push(element(
                                'div',
                                {id: index2, key: index2, className: "ne-admin-item-field-edit-form"},
                                element(
                                    "form",
                                    { action: "/admin/change/put/", method: "post"},
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
                                        {type: "hidden", name: "data", defaultValue: self.props.meta.params.dataName}
                                    ),
                                    element(
                                        'input',
                                        {type: "hidden", name: "_id", defaultValue: flatObject._id}
                                    ),
                                    element(
                                        'label',
                                        {},
                                        field.data + " -> "
                                    ),
                                    element(
                                        'br',
                                        {}
                                    ),
                                    element(
                                        "input",
                                        { type: "text", name: field.data, placeholder: flatObject[field.data]}
                                    ),
                                    element(
                                        'br',
                                        {}
                                    ),
                                    element(
                                        "button",
                                        { type: "submit" , className: "ne-admin-btn ne-admin-item-field-edit-button" },
                                        "Change " + field.data
                                    )
                                )
                            ))

                        }

                    })

                    return element(
                        "div",
                        {
                            key: index ,
                            className: "ne-ccol-3m ne-admin-item-edit"},
                        element(
                            "div",
                            {className: "ne-ccol-1s "},
                            editItem,
                            deleteItem
                        )
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
            {type: "hidden", name: "data", defaultValue: self.props.meta.params.dataName}
        ))

        self.props.dataRef[dataRefIndex].fields.forEach(function(field, index){

            if(field.type && field.type === "ObjectId"){

                addItemFields.push(element(
                    'label',
                    {},
                    field.data
                ))
                addItemFields.push(element(
                    'br',
                    {}
                ))
                addItemFields.push(element(
                    "input",
                    {type: "hidden", name: field.data, defaultValue: self.props.meta.claims.user}
                ))
                addItemFields.push(element(
                    'label',
                    {},
                    self.props.meta.claims.displayName
                ))
                addItemFields.push(element(
                    'br',
                    {}
                ))

            }
            else {

                addItemFields.push(element(
                    'label',
                    {},
                    field.data
                ))
                addItemFields.push(element(
                    'br',
                    {}
                ))
                addItemFields.push(element(
                    "input",
                    { type: "text", name: field.data, placeholder: field.data,
                        style: {
                            width: "80%"
                        }

                    }
                ))
                addItemFields.push(element(
                    'br',
                    {}
                ))

            }

        })

        var addItem;
        if (self.props.dataRef[dataRefIndex].type === "noEdit"){

            addItem = element(
                "div",
                {className: "ne-admin-item-add"},
                element(
                    "p",
                    {},
                    "Can not manually add this type of item"
                )
            )
        }

        else {

            addItem = element(
                "div",
                {className: "ne-admin-item-add"},
                element(
                    "form",
                    {   action: "/admin/change/add/",
                        method: "post"
                    },
                    addItemFields,
                    element(
                        "button",
                        { type: "submit" , className: "ne-admin-btn ne-admin-item-add-btn"},
                        "Add Item"
                    )
                )
            )

        }

        var navTopLinks = [];

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

                <div className="ne-ccol-3s ne-tcenter">
                    {cyclePreviousButton}
                </div>

                <div className="ne-ccol-3s ne-tcenter">
                    <div>
                        <h2 className="zt4"> {self.props.meta.params.dataName} items </h2>
                        <p> {cycleCurrentLabel} </p>
                        <p className="ne-admin-message"> {self.props.meta.query.message && self.props.meta.query.message} </p>

                    </div>
                </div>

                <div className="ne-ccol-3s ne-tcenter">
                    {cycleNextButton}
                </div>

            </div>

            <div className="ne-row-640 ne-tcenter ne-admin-cycle-form-top">

                {cycleForm}

            </div>

            <div className="ne-row-640">

                {items}

            </div>

            <div className="ne-row-640 ne-tcenter ne-admin-cycle-form-bottom">

                {cycleForm}

            </div>

            <div className="ne-row-640 ne-tcenter">

                <h2> add new {self.props.meta.params.dataName} item </h2>

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