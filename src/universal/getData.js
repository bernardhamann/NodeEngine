import axios from 'axios';

//////////////////////
//     GLOBALS      //
//////////////////////

import config from './../../config.json';
let rootURL = config.globals.ROOTURL;
let globals = config.globals;


//////////////////////
//       PAGE       //
//////////////////////

function getPage(pathString) {
    return axios.get(`${rootURL}/api/page?f1=path&v1=${pathString}`);
}

var pageOnly = {
    all: function(path){
        return axios.all([getPage(path)])
            .then(function(arr){
                return {
                    globals: globals,
                    page: arr[0].data[0]
                }
            })
    }
};

//////////////////////
//      PEOPLE      //
//////////////////////

var people = {
    all: function(path){
        return axios.all([getPage(path),this.getPeople()])
            .then(function(arr){
                return {
                    globals: globals,
                    page: arr[0].data[0],
                    people: arr[1].data
                }
            })
    },
    getPeople: function() {
        return axios.get(`${rootURL}/api/people`);
    }
};


//////////////////////
//    CONTROLLER    //
//////////////////////

var getData = {
    forPath: function(path){

        if (path === 'people'){
            return people.all(path);
        }

        else {
            return pageOnly.all(path);
        }

    }
};

module.exports = getData;