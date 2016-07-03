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

    app.controller('AccountController', ['$scope', 'Auth',
        function($scope, Auth) {
            $scope.auth = Auth;

            // any time auth status updates, add the user data to scope
            $scope.auth.$onAuth(function(authData) {
                $scope.authData = authData;
                if (!authData) {
                    window.location = "login.html";
                }
            });

            $scope.logout = function(){
                $scope.auth.$unauth();
            }
        }
    ]);

    app.component('imagePicker', {
        templateUrl:"template/image-picker.html",
        controller: ['$scope', function($scope) {
            filepicker.setKey("AwhE62zXS3ittGq7Xovynz");
            $scope.browserImage = function () {
                filepicker.pick(
                    {
                        minitype:'image/*',
                        services:['COMPUTER','WEBCAM','FACEBOOK','IMAGE_SEARCH', 'URL'],
                        conversions:['crop','rotate', 'filter']
                    },
                    function (img) {
                        var url = img.url;

                        var refUserActive = new Firebase("https://shoptdp.firebaseio.com/users/" + localStorage.getItem("activeId"));
                        refUserActive.update({ avatar: url });

                        location.reload();
                    }
                );
            }
        }]
    });

    app.controller('ProfileController', ["$scope",
        function($scope){
            var refUserActive = new Firebase("https://shoptdp.firebaseio.com/users/" + localStorage.getItem("activeId"));

            refUserActive.once("value", function(snapshot) {
                $scope.dataUser = snapshot.val();

                // Might need to use $digest to update $scope.
                $scope.$digest();
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

            $scope.saveUpdateInfo = function() {
                var refUserActive = new Firebase("https://shoptdp.firebaseio.com/users/" + localStorage.getItem("activeId"));
                refUserActive.update({
                    first_name: $scope.dataUser.first_name,
                    last_name: $scope.dataUser.last_name,
                    phone: $scope.dataUser.phone,
                    email: $scope.dataUser.email,
                    address: $scope.dataUser.address
                });
            }
        }
    ]);

    app.controller('LoginController', ['$scope', '$http',
        function($scope, $http) {
            this.login = function () {
                var ref = new Firebase("https://shoptdp.firebaseio.com");
                ref.authWithPassword({
                    email: $scope.emailLogin,
                    password: $scope.passwordLogin
                }, function (error, authData) {
                    if (error) {
                        $scope.checkEmailPass = true;
                        console.log("Login Failed!", error);
                        $scope.$digest();
                    } else {
                        $scope.checkEmailPass = false;
                        console.log("Authenticated successfully with payload:", authData);

                        localStorage.setItem("activeId", authData.uid);

                        window.location = "youraccount.html";
                    }
                });
            };

            $scope.logfacebook = function () {
                var ref = new Firebase("https://shoptdp.firebaseio.com");
                ref.authWithOAuthPopup("facebook", function(error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                    } else {
                        console.log("Authenticated successfully with payload:", authData);

                        localStorage.setItem("activeId", authData.uid);

                        var isUserRef = new Firebase("https://shoptdp.firebaseio.com/users/" + authData.uid);
                        isUserRef.once("value", function(snapshot) {
                            if (snapshot.val() != null) {
                                console.log("Account is existed! Come on!");
                                window.location = "youraccount.html";
                                return;
                            }
                            else {
                                console.log("Account is created! Congratulate!");
                                var usersRef = ref.child("users/" + authData.uid);
                                usersRef.set({
                                    first_name: "NEW",
                                    last_name: "USER",
                                    email: "empty",
                                    avatar: "",
                                    phone: "empty",
                                    address: "empty"
                                });

                                window.location = "youraccount.html";
                            }
                        });
                    }
                });
            };

            $scope.loggoogle = function () {
                var ref = new Firebase("https://shoptdp.firebaseio.com");
                ref.authWithOAuthPopup("google", function(error, authData) {
                    if (error) {
                        console.log("Login Failed!", error);
                    } else {
                        console.log("Authenticated successfully with payload:", authData);

                        localStorage.setItem("activeId", authData.uid);

                        var isUserRef = new Firebase("https://shoptdp.firebaseio.com/users/" + authData.uid);
                        isUserRef.once("value", function(snapshot) {
                            if (snapshot.val() != null) {
                                console.log("Account is existed! Come on!");
                                window.location = "youraccount.html";
                                return;
                            }
                            else {
                                console.log("Account is created! Congratulate!");
                                var usersRef = ref.child("users/" + authData.uid);
                                usersRef.set({
                                    first_name: "NEW",
                                    last_name: "USER",
                                    email: "empty",
                                    avatar: "images/avatar.jpg",
                                    phone: "empty",
                                    address: "empty"
                                });

                                window.location = "youraccount.html";
                            }
                        });
                    }
                });
            };
        }
    ]);

    app.controller('ProductController', ["$scope", "$firebaseArray",
        function($scope, $firebaseArray){

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

    app.controller('RegisterController', ['$scope',
        function($scope){
            this.register = function(){
                if ($scope.passwordRegister !== $scope.rePasswordRegister){
                    console.log('Password is not duplicated');
                    window.alert("PASSWORD IS NOT DUPLICATED!");
                    return;
                }

                var ref = new Firebase("https://shoptdp.firebaseio.com");
                ref.createUser({
                    email    : $scope.emailRegister,
                    password : $scope.passwordRegister
                }, function(error, userData) {
                    if (error) {
                        console.log("Error creating user:", error);
                        window.alert("USER IS EXISTED!");
                        console.log($scope.emailRegister);
                    } else {
                        localStorage.setItem("activeId", userData.uid);
                        console.log(localStorage.getItem("activeId"));

                        var usersRef = ref.child("users/" + userData.uid);
                        usersRef.set({
                            first_name: $scope.firstNameRegister,
                            last_name: $scope.lastNameRegister,
                            email: $scope.emailRegister,
                            avatar: "images/avatar.jpg",
                            phone: "",
                            address: ""
                        });
                        console.log("Successfully created user account with uid:", userData.uid);
                        window.location = "login.html";
                    }
                });
            };
        }
    ]);

})();