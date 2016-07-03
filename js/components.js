(function(){
    var app = angular.module('revolution-component', []);

    app.component('productAll', {
        templateUrl: 'template/product-list.template.html',
        controller: ['$scope', '$firebaseArray', function($scope, $firebaseArray){
            var productsArr;
            var productHatRef           = new Firebase("https://shoptdp.firebaseio.com/product/hat");
            var productSandalRef        = new Firebase("https://shoptdp.firebaseio.com/product/sandal");
            var productLazyShoesRef     = new Firebase("https://shoptdp.firebaseio.com/product/lazyshoes");
            var productSportShoesRef    = new Firebase("https://shoptdp.firebaseio.com/product/sportshoes");
            var productSkirtRef         = new Firebase("https://shoptdp.firebaseio.com/product/skirt");
            var productPromDressRef     = new Firebase("https://shoptdp.firebaseio.com/product/promdress");
            var productSleepDressRef    = new Firebase("https://shoptdp.firebaseio.com/product/sleepdress");

            // Khởi tạo một FirebaseArray lưu trữ tất cả các sản phẩm (Tạm thời) -> Gọp xong có mảng remove nó
            var allProductRef = new Firebase("https://shoptdp.firebaseio.com/product/all");
            productsArr = $firebaseArray(allProductRef);

            productHatRef.on("child_added", function _add(snap, prevChild){
                productsArr.$add(snap.val());
            });
            productSandalRef.on("child_added", function _add(snap, prevChild){
                productsArr.$add(snap.val());
            });
            productLazyShoesRef.on("child_added", function _add(snap, prevChild){
                productsArr.$add(snap.val());
            });
            productSportShoesRef.on("child_added", function _add(snap, prevChild){
                productsArr.$add(snap.val());
            });
            productSkirtRef.on("child_added", function _add(snap, prevChild){
                productsArr.$add(snap.val());
            });
            productPromDressRef.on("child_added", function _add(snap, prevChild){
                productsArr.$add(snap.val());
            });
            productSleepDressRef.on("child_added", function _add(snap, prevChild){
                productsArr.$add(snap.val());
            });

            $scope.products = productsArr;

            console.log($scope.products);

            allProductRef.remove();

            $scope.currentPage = 1;
            $scope.pageSize = 9;

            $scope.pageChangeHandler = function(num) {
                console.log('Products page changed to ' + num);
            };
        }]
    });

    // HAT COMPONENT
    app.component('hatList', {
        templateUrl: 'template/product-list.template.html',
        controller: ['$scope', '$firebaseArray', function($scope, $firebaseArray){
            var hatRef = new Firebase("https://shoptdp.firebaseio.com/product/hat");
            $scope.products = $firebaseArray(hatRef);

            console.log($scope.products);

            $scope.currentPage = 1;
            $scope.pageSize = 9;

            $scope.pageChangeHandler = function(num) {
                console.log('Products page changed to ' + num);
            };
        }]
    });

    app.component('hatDetail', {
        templateUrl: 'template/product-detail.template.html',
        controller: ['$scope', '$firebaseArray', '$routeParams', 'Auth', function($scope, $firebaseArray, $routeParams, Auth){
            var index = ($routeParams.hatId - 1).toString();
            var hatRefId = new Firebase("https://shoptdp.firebaseio.com/product/hat/" + index);
            hatRefId.on("value", function(snapshot) {
                $scope.product = snapshot.val();

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

          
        }]
    });

    // SKIRT COMPONENT
    app.component('skirtList', {
        templateUrl: 'template/product-list.template.html',
        controller: ['$scope', '$firebaseArray', function($scope, $firebaseArray){
            var skirtRef = new Firebase("https://shoptdp.firebaseio.com/product/skirt");
            $scope.products = $firebaseArray(skirtRef);

            $scope.currentPage = 1;
            $scope.pageSize = 9;

            $scope.pageChangeHandler = function(num) {
                console.log('Products page changed to ' + num);
            };
        }]
    });

    app.component('skirtDetail', {
        templateUrl: 'template/product-detail.template.html',
        controller: ['$scope', '$firebaseArray', '$routeParams', 'Auth', function($scope, $firebaseArray, $routeParams, Auth){
            var index = ($routeParams.skirtId - 1).toString();
            var skirtRefId = new Firebase("https://shoptdp.firebaseio.com/product/skirt/" + index);
            skirtRefId.on("value", function(snapshot) {
                $scope.product = snapshot.val();

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

           
        }]
    });

    // SLEEP DRESS COMPONENT
    app.component('sleepdressList', {
        templateUrl: 'template/product-list.template.html',
        controller: ['$scope', '$firebaseArray', function($scope, $firebaseArray){
            var sleepdressRef = new Firebase("https://shoptdp.firebaseio.com/product/sleepdress");
            $scope.products = $firebaseArray(sleepdressRef);

            $scope.currentPage = 1;
            $scope.pageSize = 9;

            $scope.pageChangeHandler = function(num) {
                console.log('Products page changed to ' + num);
            };
        }]
    });

    app.component('sleepdressDetail', {
        templateUrl: 'template/product-detail.template.html',
        controller: ['$scope', '$firebaseArray', '$routeParams', 'Auth', function($scope, $firebaseArray, $routeParams, Auth){
            var index = ($routeParams.sleepdressId - 1).toString();
            var sleepdressRefId = new Firebase("https://shoptdp.firebaseio.com/product/sleepdress/" + index);
            sleepdressRefId.on("value", function(snapshot) {
                $scope.product = snapshot.val();

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

            
        }]
    });

    // PROM DRESS COMPONENT
    app.component('promdressList', {
        templateUrl: 'template/product-list.template.html',
        controller: ['$scope', '$firebaseArray', function($scope, $firebaseArray){
            var promdressRef = new Firebase("https://shoptdp.firebaseio.com/product/promdress");
            $scope.products = $firebaseArray(promdressRef);

            $scope.currentPage = 1;
            $scope.pageSize = 9;

            $scope.pageChangeHandler = function(num) {
                console.log('Products page changed to ' + num);
            };
        }]
    });

    app.component('promdressDetail', {
        templateUrl: 'template/product-detail.template.html',
        controller: ['$scope', '$firebaseArray', '$routeParams', 'Auth', function($scope, $firebaseArray, $routeParams, Auth){
            var index = ($routeParams.promdressId - 1).toString();
            var promdressRefId = new Firebase("https://shoptdp.firebaseio.com/product/promdress/" + index);
            promdressRefId.on("value", function(snapshot) {
                $scope.product = snapshot.val();

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

           
        }]
    });

    // SANDAL COMPONENT
    app.component('sandalList', {
        templateUrl: 'template/product-list.template.html',
        controller: ['$scope', '$firebaseArray', function($scope, $firebaseArray){
            var sandalRef = new Firebase("https://shoptdp.firebaseio.com/product/sandal");
            $scope.products = $firebaseArray(sandalRef);

            $scope.currentPage = 1;
            $scope.pageSize = 9;

            $scope.pageChangeHandler = function(num) {
                console.log('Products page changed to ' + num);
            };
        }]
    });

    app.component('sandalDetail', {
        templateUrl: 'template/product-detail.template.html',
        controller: ['$scope', '$firebaseArray', '$routeParams', 'Auth', function($scope, $firebaseArray, $routeParams, Auth){
            var index = ($routeParams.sandalId - 1).toString();
            var sandalRefId = new Firebase("https://shoptdp.firebaseio.com/product/sandal/" + index);
            sandalRefId.on("value", function(snapshot) {
                $scope.product = snapshot.val();

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            
        }]
    });

    // LAZY SHOES COMPONENT
    app.component('lazyshoesList', {
        templateUrl: 'template/product-list.template.html',
        controller: ['$scope', '$firebaseArray', function($scope, $firebaseArray){
            var lazyshoesRef = new Firebase("https://shoptdp.firebaseio.com/product/lazyshoes");
            $scope.products = $firebaseArray(lazyshoesRef);

            $scope.currentPage = 1;
            $scope.pageSize = 9;

            $scope.pageChangeHandler = function(num) {
                console.log('Products page changed to ' + num);
            };
        }]
    });

    app.component('lazyshoesDetail', {
        templateUrl: 'template/product-detail.template.html',
        controller: ['$scope', '$firebaseArray', '$routeParams', 'Auth', function($scope, $firebaseArray, $routeParams, Auth){
            var index = ($routeParams.lazyshoesId - 1).toString();
            var lazyshoesRefId = new Firebase("https://shoptdp.firebaseio.com/product/lazyshoes/" + index);
            lazyshoesRefId.on("value", function(snapshot) {
                $scope.product = snapshot.val();

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

           
        }]
    });

    // SPORT SHOES COMPONENT
    app.component('sportshoesList', {
        templateUrl: 'template/product-list.template.html',
        controller: ['$scope', '$firebaseArray', function($scope, $firebaseArray){
            var sportshoesRef = new Firebase("https://shoptdp.firebaseio.com/product/sportshoes");
            $scope.products = $firebaseArray(sportshoesRef);

            $scope.currentPage = 1;
            $scope.pageSize = 9;

            $scope.pageChangeHandler = function(num) {
                console.log('Products page changed to ' + num);
            };
        }]
    });

    app.component('sportshoesDetail', {
        templateUrl: 'template/product-detail.template.html',
        controller: ['$scope', '$firebaseArray', '$routeParams', 'Auth', function($scope, $firebaseArray, $routeParams, Auth){
            var index = ($routeParams.sportshoesId - 1).toString();
            var sportshoesRefId = new Firebase("https://shoptdp.firebaseio.com/product/sportshoes/" + index);
            sportshoesRefId.on("value", function(snapshot) {
                $scope.product = snapshot.val();

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
            
        }]
    });

})();