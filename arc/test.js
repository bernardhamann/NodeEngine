var axios = require('axios');
var getPeople = require('./getPeople');

axios.get('http://localhost:3001/api/people')
    .then(function(response){
        console.log(response.data); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
    });

getPeople.all();