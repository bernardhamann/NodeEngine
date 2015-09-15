var axios = require('axios');

function getP(){
    return axios.get('http://localhost:3001/api/people');
}

var getPeople = {
    all: function(){
        return axios.all([getP()])
            .then(function(arr){
                console.log('getpeopleCalled');
                console.log(arr[0].data);
                return {
                    people: arr[0].data
                }
            })
    },
    getP: function() {
        return axios.get('http://localhost:3001/api/people');
    }
};

module.exports = getPeople;



/*
 var promiseObj = getPeople();
 promiseObj.then(function(data){
 console.log(data)
 })


 getData.all()
 .then(function(dataObj){
 self.setState({
 people: dataObj.people
 });
 })


 var promiseObj = getPeople();
 promiseObj.then(function(dataObj){
 self.setState({
 people: dataObj.people
 });
 })

 */