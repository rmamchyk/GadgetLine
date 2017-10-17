

var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

//directives
app.directive('toggleClass', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
});
app.directive('myEnter', function () {
    return function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

//app config
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/products');

    $stateProvider
        .state('products', {
            url: '/products',
            templateUrl: '../templates/productGrid.html',
            controller: 'ProductGridController'
        });
});


app.service('apiService', function($http) {
    var self = this;

    self.getApiCall = function (methodName, callback) {
        $http.get(methodName)
            .then(function (response) {
                var event = {
                    result: response.data,
                    hasErrors: false
                };
                callback(event);
            }, function (response) {
                var event = {
                    result: null,
                    hasErrors: true,
                    error: response.statusText
                }
                callback(event);
            });
    };

    self.postApiCall = function (methodName, obj, callback) {
        $http.post(methodName, obj)
            .then(function (response) {
                var event = {
                    result: response.data,
                    hasErrors: false
                };
                callback(event);
            }, function (response) {
                debugger;
                var event = {
                    result: null,
                    hasErrors: true,
                    error: response.statusText
                }
                callback(event);
            });
    };
});


app.controller('EditProductController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance, data) {
    $scope.product = data;

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function() {
        $uibModalInstance.close($scope.product);
    };
}]);
app.controller('MainController',['$scope', '$http', function($scope, $http) {
    $scope.models = {
        categories: []
    };

    $scope.searchQuery = null;

    $scope.selectedCategory = null;
    $scope.categoriesMenuOpened = true;

    $scope.searchProducts = function () {
        if ($scope.getProductData && typeof $scope.getProductData == "function") {
            $scope.getProductData();
        };
    };

    $scope.changeCategory = function (event, selected) {
        $scope.selectedCategory = selected;
        event.stopPropagation();
    }

    $scope.toggleCategoriesMenu = function() {
        $scope.categoriesMenuOpened = !$scope.categoriesMenuOpened;
    }

    var getCategoryData = function() {
        $.ajax({
            type: 'GET',
            url: '/categories',
            contentType: 'application/json',
            dataType: 'json',
            success: function(result){
                debugger;
                $scope.models.categories = result;

                if ($scope.models.categories.length > 0) {
                    $scope.selectedCategory = $scope.models.categories[0];
                    if ($scope.getProductData && typeof $scope.getProductData == "function") {
                        $scope.getProductData();
                    }
                }
            },
            error: function(){
                console.log("GET /categories request FAILED");
            }
        });

    };

    getCategoryData();
}]);
app.controller('ProductGridController', ['$scope', '$http', '$uibModal', '$log',
    function($scope, apiService, $uibModal, $log) {
    $scope.data = {
        productsData: {
            totalItems: 0,
            pageNumber: 1,
            pageSize: 15,
            categoryId: null,
            data: []
        }
    };

    $scope.editProduct = function(product) {
        var modalInstanse = $uibModal.open({
            animation: true,
            templateUrl: '../templates/editProduct.html',
            controller: 'EditProductController',
            size: '',
            resolve: {
                data: product
            }
        });

        modalInstanse.result.then(function(editedProduct) {
            $scope.data.productsData.selectedProduct = editedProduct;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.getProductData = function() {
        if ($scope.selectedCategory) {


            var db = [
                {
                    Id: 1,
                    Code: 001,
                    Title: "Lenovo IdeaPad",
                    Price: 345.70,
                    CategoryId: 1
                },
                {
                    Id: 2,
                    Code: 002,
                    Title: "Macbook OS X",
                    Price: 2345,
                    CategoryId: 2
                },
                {
                    Id: 3,
                    Code: 003,
                    Title: "Nokia 1020",
                    Price: 345.70,
                    CategoryId: 3
                },
                {
                    Id: 4,
                    Code: 004,
                    Title: "Meizu U20",
                    Price: 410.35,
                    CategoryId: 3
                }
            ];

            $scope.data.productsData.data = db.filter(function(prod){
                return prod.CategoryId == $scope.selectedCategory.id;
            });

            $scope.data.productsData.totalItems = 4;
        }
    };

    $scope.pageChanged = function() {
        $scope.getProductData();
    }

    $scope.$watch('selectedCategory', function() {
        $scope.data.productsData.pageNumber = 1;
        $scope.getProductData();
    });
}]);