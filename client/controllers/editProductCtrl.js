app.controller('EditProductController', ['$http', '$stateParams', 'Product', function($http, $params, Product) {
    var self = this;

    self.product = {};

    Product.getById(parseInt($params.id), function(data){
        self.product = data;
    });
}]);