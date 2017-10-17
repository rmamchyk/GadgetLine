var app = angular.module('glApp', ['ui.router', 'ui.bootstrap']);

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
            controller: 'MainController'
        });
});


app.component('productsGrid', {
    templateUrl: '../views/components/products-grid.html',
    bindings: {
        data: '='
    },
    controller: function(){
        this.pageChanged = function(){

        }
    },
    controllerAs: 'vm'
});
app.controller('EditProductController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance, productData) {
    $scope.product = productData;

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function() {
        $uibModalInstance.close($scope.product);
    };
}]);
app.controller('MainController',['$http', function($http) {
    var vm = this;
    vm.names = ['roman', 'natalia', 'ruslan'];
    vm.categories = [];
    vm.selectedCategory = {id: 1};
    vm.productsData = {
            totalItems: 0,
            pageNumber: 1,
            pageSize: 15,
            items: []
    };
    vm.searchQuery = null;
    vm.categoriesMenuOpened = true;

    //load products by page for selected category.
    vm.searchProducts = function () {
        var pageRequest = {
            pageNumber: vm.productsData.pageNumber - 1,
            pageSize: vm.productsData.pageSize,
            categoryId: vm.selectedCategory.id
        };

        $http({ method: 'POST', url: '/products/search', data: JSON.stringify(pageRequest)})
            .then(function(response){
            var pageResult = response.data;
            vm.productsData.items = pageResult.items;
            vm.productsData.totalItems = pageResult.totalItems;
        }, function(){
            console.log("GET /products/search request FAILED");
        });
    };
    vm.searchProducts();

    //load all category list.
    $http({ method: 'GET', url: '/categories' }).then(function(response){
        vm.categories = response.data;

        if (vm.categories.length > 0) {
            var prevCategoryId = vm.selectedCategory.id;
            vm.selectedCategory = vm.categories[0];
            if(prevCategoryId != vm.selectedCategory.id){
                vm.productsData.pageNumber = 1;
                vm.searchProducts();
            }

        }
    }, function(){
        console.log("GET /categories request FAILED");
    });

    vm.changeCategory = function (event, selected) {
        var prevCategoryId = vm.selectedCategory.id;
        vm.selectedCategory = selected;
        if(prevCategoryId != vm.selectedCategory.id) {
            vm.productsData.pageNumber = 1;
            vm.searchProducts();
        }
        event.stopPropagation();
    };

    vm.toggleCategoriesMenu = function() {
        vm.categoriesMenuOpened = !vm.categoriesMenuOpened;
    };
}]);