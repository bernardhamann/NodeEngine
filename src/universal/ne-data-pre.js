import axios from 'axios';

//////////////////////
//  CONTROLLER
//////////////////////

var getData = {

    fetch: function(rootURL, pathString){
        var self = this;
        return axios.all([this.pageRequest(rootURL, pathString)])
            .then(function(page){
                var pdNumber = page[0].data[0].pd.pdNumber;

                if (pdNumber === 0) {
                    console.log("Requesting < core > for < " + pathString +" >");
                    return {
                        page: page[0].data[0]
                    }
                }

                else if (pdNumber === 1) {

                    console.log("Requesting < core + 1 packet > for < " + pathString +" >");

                    var pd1 = page[0].data[0].pd.pd1;
                    return axios.all([self.preData(pd1)])
                        .then(function(pd){
                            return {
                                page: page[0].data[0],
                                pd1: pd[0].data
                            }
                        });
                }

                else if (pdNumber === 2) {

                    console.log("Requesting < core + 2 packets > for < " + pathString +" >");

                    var pd1 = page[0].data[0].pd.pd1;
                    var pd2 = page[0].data[0].pd.pd2;
                    return axios.all([self.preData(pd1),self.preData(pd2)])
                        .then(function(pd){
                            return {
                                page: page[0].data[0],
                                pd1: pd[0].data,
                                pd2: pd[1].data
                            }
                        });
                }
                else {
                    console.log("dataNumber did not match: " + pdNumber);
                    return {
                        errorMessage: "dataNumber did not match",
                        dataNumber: dataNumber
                    }
                }
            })
    },

    pageRequest: function(rootURL, pathString) {
        return axios.get(`${rootURL}/api/page?f1=path&v1=${pathString}`);
    },

    preData: function(pdx) {
        var path = pdx.path;
        var query = pdx-query;
        return axios.get(`${path}`);

    }

    // pd = pre render data request
    // the user can also add dr which is handled on the clientside
    // there can maybe be a if statement in here
    // if client js is active the pd is not done and is handled on the clientside
    // dr = data request
    // pd2query is a object with the query details
};


module.exports = getData;