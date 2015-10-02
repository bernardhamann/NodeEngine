var flattenObject = function(ob) {
    var toReturn = {};
    var flatObject;
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) {
            continue;
        }
        if ((typeof ob[i]) === 'object') {
            flatObject = flattenObject(ob[i]);
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
};

var objectX =  {
    "_id": "560436873943da7d4d6f2b99",
    "__v": 0,
    "createdAt": "Thu Sep 24 2015 19:44:35 GMT+0200 (SAST)",
    "log": [],
    "local": {
        "username": "jack",
        "password": {
            "something":{
                "somethingElse": "This"
            }
        }
    },
    "tokens": {
        "neReader": null,
        "neEditor": "5604d27dff09680ce108dc01",
        "neAdmin": "560467d20ce456d67b4ede7d"
    },
    "profile": {
        "nameFirst": "Jack",
        "nameLast": "Johnson",
        "email": "j@j.com",
        "phone": "0345534455"
    }
};


var objectXFlat = flattenObject(objectX);

console.log(objectXFlat);

console.log('objectXFlat');
console.log(objectXFlat['tokens.neEditor']);