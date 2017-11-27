var app = angular.module('GadgetLineApp', ['ui.router', 'ui.bootstrap']);

//app constants
app.constant('_', window._);

//app config
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: '<div>This is HOME page...</div>'
        })
        .state('contacts', {
            url: '/contacts',
            templateUrl: 'views/contacts.html'
        })
        .state('services', {
            url: '/services',
            templateUrl: 'views/services.html'
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

app.directive("fileModel", function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = scope[attrs.fileModel]
                model.photos = [];
                model.previews = [];
                element.bind("change", function(event) {
                    var selectedFile = event.target.files[0];
                    model.photos.push(selectedFile);

                    var reader = new FileReader();
                    reader.onload = function(loadEvent){
                        scope.$apply(function() {
                            model.previews.push({src: loadEvent.target.result});

                        });
                    };
                    reader.readAsDataURL(event.target.files[0]);
                });
            }
        }
    }
);
app.controller('EditProductController', ['$http', '$stateParams', 'Product', '_', function ($http, $params, Product, _) {
    var self = this;

    self.photos = [];
    self.previews = [];

    self.product = {photos: []};

    Product.get($params.id, function (data) {
        if (data) {
            self.product._id = data._id;
            self.product.code = data.code;
            self.product.title = data.title;
            self.product.price = data.price;
            self.product.categoryId = data.categoryId;
            self.product.images = data.images || [];
        }
    });

    var getFileExtension = function (filename) {
        var r = /.+\.(.+)$/.exec(filename);
        return r ? r[1] : null;
    };

    self.submit = function () {
        self.product.photos = [];
        _.each(self.photos || [], function (item) {
            //Todo: Store a new photo with filename as: product.code + '-' + random id.
            //item.code = self.product.code;
            //item.name = self.product.code + '.' + getFileExtension(item.name);
            self.product.photos.push(item);
        });
        Product.post(self.product, function (res) {
            if (res.success) {
                console.log(res.product);
                res.product.photos = [];
                self.product = res.product;
            }
            self.photos = [];
            self.previews = [];
        });
    };
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
app.factory('Product', ['$http', '_', function ($http, _) {
    return {
        get: function (id, successCallback) {
            $http.get('/products/' + id)
                .then(function (response) {
                    successCallback(response.data);
                }, function () {
                    console.log("GET /products/:id request has failed.");
                });
        },
        post: function (product, successCallback) {
            var fd = new FormData();
            for (var key in product) {
                if (product[key] && Array.isArray(product[key])) {
                    if(product[key].length){
                        _.each(product[key], function (item) {
                            fd.append(key+'[]', item);
                        });
                    }
                } else {
                    fd.append(key, product[key]);
                }
            }

            $http.post('/products/update', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function (response) {
                successCallback(response.data);
            }, function () {
                console.log("POST /products/update request has failed.");
            });
        }
    }
}]);