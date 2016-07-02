(function() {
    var app = angular.module('music-app', ['ngMaterial', 'ngResource', 'ngRoute']);

    app.controller('graphController', ['$resource', function($resource) {
        var gc = this;
        this.getResource = function(url) {
            return $resource(url);
        }
        this.dummy = function(){
            console.log("dummmy is working");
        }
        this.search = function() {
            console.log("under search");

            var url = 'http://karanverma.me/js/stock_min.json';
            gResource = this.getResource(url);
            // // <<<<< This is how do you search track given its title name >>>>>
            var entry = gResource.query(function() {
                console.log("JSON Responce is =>"+entry);
                gc.data = entry;
                
                console.log("Keyword is => "+gc.searchKeyword);
                angular.forEach(gc.data,function(val){
                    if(gc.searchKeyword==val.Ticker){
                        gc.result = val;
                    }
                });
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
