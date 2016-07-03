// app.controller("BarCtrl", function ($scope) {
//   $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
//   $scope.series = ['Series A', 'Series B'];

//   $scope.data = [
//     [65, 59, 80, 81, 56, 55, 40],
//     [28, 48, 40, 19, 86, 27, 90]
//   ];
// });

(function() {
    var app = angular.module('graph-app', ['ngMaterial', 'ngResource', 'd3']);
    app.service('graphService', ['$resource', function($resource) {
        this.getResource = function(url) {
            return $resource(url);
        }
        this.init = function() {
            // check if there is query in url
            // and fire search in case its value is not empty
            var url = 'http://karanverma.me/js/stock_min.json';
            gResource = this.getResource(url);
            // // <<<<< This is how do you search track given its title name >>>>>
            var entry = gResource.query(function() {
                console.log("JSON Responce is =>" + entry);

            });
            return entry;
        };
        this.val = this.init();

        this.returnJSON = function() {
            return this.val;
        }

        this.getAvg = function() {
            console.log('het');
            data = this.returnJSON();
            console.log(data);
            var secAvg = {};
            angular.forEach(data, function(val) {
                if (val.Sector in secAvg) {
                    // yes => add total & increase counter
                    sectorVal = secAvg[val.Sector];
                    if ('Profit Margin' in val) {
                        sectorVal["Total Profit Margin"] = sectorVal["Total Profit Margin"] + val["Profit Margin"];
                    }
                    sectorVal["count"] = sectorVal["count"] + 1;
                    console.log("Sector is => " + val.Sector);
                    console.log("Profit Margin=>" + sectorVal["Total Profit Margin"]);

                } else {
                    var sectorVal = {};
                    sectorVal["count"] = 1;
                    sectorVal["Total Profit Margin"] = val["Profit Margin"];
                    console.log("Sector is => " + val.Sector);
                    console.log("Profit Margin =>" + val["Profit Margin"]);
                    secAvg[val.Sector] = sectorVal;
                    // no => add new key value pair make counter 1
                }

            });
            console.log("This is what have you doooonnnneneeeeee ===>" + JSON.stringify(secAvg));
            var r = {};
            var result = []
            for (var sec in secAvg) {
                console.log("Sector = > " + sec);
                console.log("For Loop => " + JSON.stringify(secAvg[sec]));
                r["avg"] = secAvg[sec]["Total Profit Margin"] / secAvg[sec]["count"];
                r["sec"] = sec;
                result.push(r);

                // secAvg[sec]
                // var value = myDictionary[key];
                // Use `key` and `value`
            }
            console.log("result ===>" + JSON.stringify(result));

        }

        // for the pie chart

        this.getMark = function() {
            console.log('mark');
            data = this.returnJSON();
            console.log(data);
            var indMark = {};
            angular.forEach(data, function(val) {
                if (val.Industry in indMark) {
                    console.log("under if");
                    // yes => add total & increase counter
                    industryVal = indMark[val.Industry];
                    if ('Market Cap' in val) {
                        industryVal["Total Market Cap"] = industryVal["Total Market Cap"] + val["Market Cap"];
                    }
                    // sectorVal["count"] = sectorVal["count"] + 1;
                    console.log("industry is => " + val.Industry);
                    console.log("market cap=>" + industryVal["Total Market Cap"]);

                } else {
                    console.log("under else");
                    var industryVal = {};
                    // sectorVal["count"] = 1;
                    industryVal["Total Market Cap"] = val["Market Cap"];
                    indMark[val.Industry] = industryVal;
                    console.log("industryy is => " + val.Industry);
                    console.log("market capp =>" + val["Market Cap"]);
                    // secAvg[val.Sector] = sectorVal;
                    // no => add new key value pair make counter 1
                }

            });
            console.log("This is what have you doooone ===>" + JSON.stringify(indMark));
        }

    }]);
    app.controller('graphController', ['$resource', 'graphService', function($resource, graphService) {
        var gc = this;
        // this.getResource = function(url) {
        //         return $resource(url);
        //     }
        // at the bottom of your controller

        // and fire it after definition
        gc.data = graphService.returnJSON();
        this.barGraph = function() {
            graphService.getAvg();
        }

        this.pieChart = function() {
            graphService.getMark();
        }

        this.dummy = function() {
            console.log("dummmy is working");
        }
        this.search = function() {
            console.log("under search");
            console.log("Keyword is => " + gc.searchKeyword);
            angular.forEach(gc.data, function(val) {
                if (gc.searchKeyword == val.Ticker) {
                    gc.result = val;
                }

            });
        }


    }]); //closing controller
    app.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    });
})();

// {"Sector1":{total:2100,
//             count:3,
//             },
// "Sector2":{total:2100,
//             count:1,
//             },            
// }
// val.Sector if it exist in avgJSON
// yes => add total & increase counter
// no => add new key value pair make counter 1

// Google

// 1. how to create dict/json in javascript
// var dict = []; // create an empty array

// dict.push({
//     key:   "keyName",
//     value: "the value"
// });

// 2. how to find key from json
// 3. how to change json data
// 4. how to add new object in json

// The best way to achieve this would be to rely on the fact that the in operator returns a 
// boolean value that indicates if the key is present in the object.

// var o = {k: 0};
// console.log('k' in o);

//secAvg: {
//    "Sector1":{
//       "Total Profit Margin": 2100,
//       "count":
//    },

// }

// var secAvg = {};
// if(val.Sector in secAvg ){
//     // yes => add total & increase counter
//     sectorVal = secAvg[val.Sector];
//     sectorVal["Total Profit Margin"] = sectorVal["Total Profit Margin"]+val["Profit Margin"];
//     sectorVal["count"] = sectorVal["count"]+1;

// }
// else{
//     var sectorVal = {};
//     sectorVal["count"] = 1;
//     sectorVal["Total Profit Margin"] = val["Profit Margin"];
//     secAvg[val.Sector] = sectorVal;
//     // no => add new key value pair make counter 1
// }
// console.log("This is what have you doooonnnneneeeeee ===>"+secAvg);
