var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var neData = require('ne-data');

var modelSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    user:{type: Schema.ObjectId},
    createdAt:{type: String, required: true},
    testField: {
        data: {type: String, default: "This is the data part"},
        type: {type: String, default: "p"}
    },
    testField2: {
        data: {type: String, default: "/images/fvdfsvsf.png"},
        type: {type: String, default: "img"}
    }
});

/*
Later in the handler you just call a function similar to this
{self.props.nerb1 && self.props.nerb1.testField && neHandler(self.props.nerb1.testField)}

or

 {neHandler(self.props, {field: "nerb1.testField", otherOption: "something"})}

and the app will place the javascript version of that there no need to then transpile the jsx

also in the handler you need to say wheter it is a map or wheter just one object is expected back

 {neHandler(self.props, {field: "nerb1.testField", map: true})}

 */

var Model = mongoose.model(
    'emails',
    modelSchema
    );

module.exports = function (router){

    var permissionsArray = ['reader'];

    neData.get(router, Model);
    neData.putWithPermissions(router, Model, permissionsArray);
    neData.postWithPermissions(router, Model, permissionsArray);
    neData.deleteWithPermissions(router, Model, permissionsArray);

};


/*


Map in the handler and return components.

Pass the data to the component
var neHandler = require('ne-handler')


this.props.nerb1.map(function(item, index){

<neHandler.textBox1 {...this.props}/>

})

--------

var renderer = function (dataObject, {
      renderType: "dp",
      dClass: "class-name-of-div",
      dIndex: "id-name-of-div",
      dKey: "key-of-div",
      pText: "description",
})

var renderer = function (dataObject, optionsObject){

If (dataObject.renderType === dp){
     return (
             <div key={dataObject.dKey} className={dataObject.dClass} id={dataObject.dId}>
                       <p> {dataObject[pText]}</p>
              </div>
     )
}

}

-----



 */