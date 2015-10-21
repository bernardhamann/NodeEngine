var React = require('react');

var neHandler = {

    msg: function (self) {
        return self.props.data.message && React.createElement(
                'div',
                { className: 'state-message-div' },
                React.createElement(
                    'p',
                    { className: 'state-message-p' },
                    self.props.data.message
                )
            )
    },

    message: function (self) {
        return self.props.data.message && React.createElement(
                'div',
                { className: 'state-message-div' },
                React.createElement(
                    'p',
                    { className: 'state-message-p' },
                    self.props.data.message
                )
            )
    },

    flattenObject: function(ob) {
        var self = this

        var toReturn = {};
        var flatObject;
        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) {
                continue;
            }
            if ((typeof ob[i]) === 'object') {
                flatObject = self.flattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) {
                        continue;
                    }
                    toReturn[i + (!!isNaN() ? '.' + x : '')] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    }

};


module.exports = neHandler;

/*

 flatten object sources:

 https://gist.github.com/penguinboy/762197
 https://gist.github.com/gdibble/9e0f34f0bb8a9cf2be43

 */

/*

 var neHandler = require('../ne-handler');


 var handler = React.createClass({

 render: function() {
 var self = this;

 console.log(self.props);

 var users;
 if(self.props.data.nedb1){
 users = self.props.data.nedb1.map((user, index)=>{
 return (
 <div key={index}>
 {user.profile.name.displayName && <p>{user.profile.name.displayName}<br/></p> }
 </div>
 )
 });
 }

 return (
 <body>
 <Header {...self.props} />
 <h2 id="main-title">This is the Users Handler</h2>
 {neHandler.msg(self)}
 {users}
 <Footer />
 </body>
 )
 }
 });


 */