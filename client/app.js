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
        .state('products', {
            url: '/products/category/:id',
            templateUrl: 'views/productsList.html'
        })
        .state('editProduct', {
            url: '/products/:id',
            templateUrl: 'views/editProduct.html'
        });
});

