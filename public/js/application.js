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

                function getFileExtension(filename) {
                    var r = /.+\.(.+)$/.exec(filename);
                    return r ? r[1] : null;
                }

                function arrayBufferToBase64( buffer ) {
                    var binary = '';
                    var bytes = new Uint8Array( buffer );
                    var len = bytes.byteLength;
                    for (var i = 0; i < len; i++) {
                        binary += String.fromCharCode( bytes[ i ] );
                    }
                    return window.btoa( binary );
                }

                function base64ToArrayBuffer(base64) {
                    var binary_string =  window.atob(base64);
                    var len = binary_string.length;
                    var bytes = new Uint8Array( len );
                    for (var i = 0; i < len; i++)        {
                        bytes[i] = binary_string.charCodeAt(i);
                    }
                    return bytes.buffer;
                }

                element.bind("change", function(event) {
                    var selectedFile = event.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function(loadEvent){
                        var fileName = model.product.code + '-' + Math.random().toString(36).substr(2, 9) + '.' + getFileExtension(selectedFile.name);
                        var fileDataURL = 'data:' + selectedFile.type +';base64,' + arrayBufferToBase64(loadEvent.target.result);
                        scope.$apply(function() {
                            model.previews.push({name: fileName, src: fileDataURL});
                            model.mainImage = fileDataURL;
                            model.photos.push(new File([loadEvent.target.result], fileName, {type: selectedFile.type}));
                        });
                    };
                    reader.readAsArrayBuffer(selectedFile);
                });
            }
        }
    }
);
app.controller('EditProductController', ['$http', '$stateParams', 'Product', '_', function ($http, $params, Product, _) {
    var self = this;

    self.photos = [];
    self.previews = [];
    self.mainImage = '../images/no-photo.png';

    self.product = {photos: []};

    Product.get($params.id, function (data) {
        if (data) {
            self.product._id = data._id;
            self.product.code = data.code;
            self.product.title = data.title;
            self.product.price = data.price;
            self.product.categoryId = data.categoryId;
            self.product.images = data.images || [];
            if(self.product.images && self.product.images.length > 0){
                self.mainImage = '../uploads/' + self.product.images[0];
            }
        }
    });

    self.selectImage = function(img){
        self.mainImage = '../uploads/' + img;
    };

    self.selectPreview = function(preview){
        self.mainImage = preview.src;
    };

    self.deleteImage = function(img){
        var imgIndex = self.product.images.indexOf(img);
        if(imgIndex > -1){
            if(self.product.images.length == 1){
                if(self.previews.length > 0){
                    self.mainImage = self.previews[0].src;
                }else{
                    self.mainImage = '../images/no-photo.png';
                }
                self.product.images.splice(imgIndex, 1);
            }else{
                self.product.images.splice(imgIndex, 1);
                self.mainImage = '../uploads/' + self.product.images[0];
            }
        }
    };

    self.deletePreview = function(preview){
        var previewIndex = self.previews.indexOf(preview);
        if(previewIndex > -1){
            if(self.previews.length == 1){
                if(self.product.images.length > 0){
                    self.mainImage = '../uploads/' + self.product.images[0];
                }else{
                    self.mainImage = '../images/no-photo.png';
                }
                self.previews.splice(previewIndex, 1);
                self.photos.splice(previewIndex, 1);
            }else{
                self.previews.splice(previewIndex, 1);
                self.photos.splice(previewIndex, 1);
                self.mainImage = self.previews[0].src;
            }
        }
    };

    self.submit = function () {
        self.product.photos = [];
        _.each(self.photos || [], function (item) {
            self.product.photos.push(item);
        });
        Product.post(self.product, function (res) {
            if (res.success) {
                res.product.photos = [];
                self.product = res.product;
                if(self.product.images && self.product.images.length > 0){
                    self.mainImage = '../uploads/' + self.product.images[0];
                }
                self.photos = [];
                self.previews = [];
            }
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
                    if (product[key].length) {
                        _.each(product[key], function (item) {
                            fd.append(key + '[]', item);
                        });
                    }
                } else {
                    fd.append(key, product[key]);
                }
            }

            _.each(product.photos, function (file) {
                fd.append('images[]', file.name);
            });

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