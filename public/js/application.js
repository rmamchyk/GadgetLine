var app = angular.module('GadgetLineApp', ['ui.router', 'ui.bootstrap']);

//app config
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: '<div>This is HOME page...</div>'
        })
        .state('products', {
            url: '/products/category/:id',
            templateUrl: 'views/productsList.html'
        })
        .state('editProduct', {
            url: '/products/:id',
            templateUrl: 'views/editProduct.html'
        });
});


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

app.controller('EditProductController', ['$http', '$stateParams', 'Product', function($http, $params, Product) {
    var self = this;

    self.product = {};

    Product.getById(parseInt($params.id), function(data){
        self.product = data;
    });
}]);
app.controller('MainController',['$http', function($http) {
    var self = this;

    self.categoriesMenuOpened = true;

    self.categories = [];

    self.selectedCategoryId = 1;

    self.searchQuery = '';

    self.loadCategories = function(){
        $http({ method: 'GET', url: '/categories' }).then(function(response){
            self.categories = response.data || [];
        }, function(){
            console.log("GET /categories request FAILED");
        });
    };

    self.toggleCategoriesMenu = function() {
        self.categoriesMenuOpened = !self.categoriesMenuOpened;
    };

    self.changeCategory = function(event, category){
        self.selectedCategoryId = category.id;
    };


    self.searchProducts = function(){

    };

    self.loadCategories();
}]);
app.controller('ProductsListController', ['$http', '$scope', '$stateParams', function($http, $scope, $params) {
    var self = this;

    self.viewMode = 'block';

    self.selectedCategoryId = parseInt($params.id);

    self.productsData = {
        totalItems: 0,
        pageNumber: 1,
        pageSize: 15,
        items: []
    };

    self.getProducts = function() {
        var request = {
            pageNumber: self.productsData.pageNumber - 1,
            pageSize: self.productsData.pageSize,
            categoryId: self.selectedCategoryId
        };

        $http({ method: 'POST', url: '/products/list', data: JSON.stringify(request)})
            .then(function(response){
                self.productsData.items = response.data.items;
                self.productsData.totalItems = response.data.totalItems;
            }, function(){
                console.log("GET /products/search request FAILED");
            });
    };

    self.getProducts();

}]);
app.factory('Product', ['$http', function ($http){
    return {
        getById: function(productId, successCallback){
            return $http.get('/products/'+productId)
                .then(function(response){
                    successCallback(response.data);
                }, function(){
                    console.log("GET /products/:id request FAILED");
                })
        }
    }
}]);