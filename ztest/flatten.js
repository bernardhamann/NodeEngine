var neHandler = require('ne-handler');

var object = {
    _id: '560fb3e0e2a248833bd2beaa',
    nameFirst: 'Goofy',
    nameLast: 'Golfers',
    createdAt: 'Wed Oct 14 2015 07:01:42 GMT+0200 (SAST)',
    second: {
        level: '2nd Level Stuff'
    }
};

toFlaten = {
    "name": "people",
    "interfaceType": "default",
    "userSlug": {
        slug: "fffgggg"
    },
    "apiSlug": "/api/people",
    "categories": [],
    "tags": [],
    "fields": ["nameFirst", "nameLast", "email", "second.level"],
    "cycleByDefault": false,
    "batchSize": 10
};

var flatObject = neHandler.flattenObject(object);

console.log(flatObject);