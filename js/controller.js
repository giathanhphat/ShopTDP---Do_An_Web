(function() {
    var app = angular.module('revolutionShop', [
        'revolution-directive',
        'firebase',
        'xeditable',
        'ngRoute',
        'revolution-component',
        'infinite-scroll',
        'angularUtils.directives.dirPagination',
        'ngAnimate'
    ]);

    app.config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/product', {
                    template: '<product-all></product-all>'
                }).
                when('/product/hat', {
                    template: '<hat-list></hat-list>'
                }).
                when('/product/hat/:hatId', {
                    template: '<hat-detail></hat-detail>'
                }).
                when('/product/skirt', {
                    template: '<skirt-list></skirt-list>'
                }).
                when('/product/skirt/:skirtId', {
                    template: '<skirt-detail></skirt-detail>'
                }).
                when('/product/sleepdress', {
                    template: '<sleepdress-list></sleepdress-list>'
                }).
                when('/product/sleepdress/:sleepdressId', {
                    template: '<sleepdress-detail></sleepdress-detail>'
                }).
                when('/product/promdress', {
                    template: '<promdress-list></promdress-list>'
                }).
                when('/product/promdress/:promdressId', {
                    template: '<promdress-detail></promdress-detail>'
                }).
                when('/product/sandal', {
                    template: '<sandal-list></sandal-list>'
                }).
                when('/product/sandal/:sandalId', {
                    template: '<sandal-detail></sandal-detail>'
                }).
                when('/product/lazyshoes', {
                    template: '<lazyshoes-list></lazyshoes-list>'
                }).
                when('/product/lazyshoes/:lazyshoesId', {
                    template: '<lazyshoes-detail></lazyshoes-detail>'
                }).
                when('/product/sportshoes', {
                    template: '<sportshoes-list></sportshoes-list>'
                }).
                when('/product/sportshoes/:sportshoesId', {
                    template: '<sportshoes-detail></sportshoes-detail>'
                }).
                otherwise('/product');
        }
    ]);

    app.run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });

    app.factory("Auth", ["$firebaseAuth",
        function($firebaseAuth) {
            var ref = new Firebase("https://shoptdp.firebaseio.com");
            return $firebaseAuth(ref);
        }
    ]);

    app.controller('RevolutionController', ['$scope', 'Auth',
        function($scope, Auth){

            $scope.auth = Auth;

            // any time auth status updates, add the user data to scope
            $scope.auth.$onAuth(function(authData) {
                $scope.authData = authData;
                if (!authData) {

                }
            });

            $scope.logout = function(){
                $scope.auth.$unauth();
            }


        }
    ]);
    

})();