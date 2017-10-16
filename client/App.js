var App = angular.module('App', ['ngRoute', 'ui.bootstrap']);

//directives
App.directive('toggleClass', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
});
App.directive('myEnter', function () {
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

//services
App.service('apiService', apiService);

//controllers
App.controller('MainController',['apiService', '$scope', MainController]);
App.controller('ProductGridController', ['apiService', '$scope', '$uibModal', '$log', ProductGridController]);
App.controller('EditProductController', EditProductController);

//app config
App.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    
    $routeProvider.when('/products', {
        templateUrl: 'SPA/views/productGrid.html',
        controller: ProductGridController
    }).otherwise({redirectTo: '/products'});
});

