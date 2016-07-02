(function() {
    var app = angular.module('music-app', ['ngMaterial', 'ngResource', 'ngRoute']);

    app.controller('graphController', ['$resource', function($resource) {
        var gc = this;
        this.getResource = function(url) {
                return $resource(url);
            }
            // at the bottom of your controller
        this.init = function() {
            // check if there is query in url
            // and fire search in case its value is not empty
            var url = 'http://karanverma.me/js/stock_min.json';
            gResource = this.getResource(url);
            // // <<<<< This is how do you search track given its title name >>>>>
            var entry = gResource.query(function() {
                console.log("JSON Responce is =>" + entry);
                gc.data = entry;
            });
        };
        // and fire it after definition
        this.init();
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
        this.getAvg = function() {
            console.log('het');
            console.log(gc.data);
            var secAvg = {};
            angular.forEach(gc.data, function(val) {
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
            
            for (var sec in secAvg) {
                console.log("Sector = > "+sec);
                console.log("For Loop => "+JSON.stringify(secAvg[sec]));
                secAvg[sec]["avg"] = secAvg[sec]["Total Profit Margin"]/secAvg[sec]["count"];
                // secAvg[sec]
                // var value = myDictionary[key];
                // Use `key` and `value`
            }
             console.log("This is what have you doooonnnneneeeeee ===>" + JSON.stringify(secAvg));

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
