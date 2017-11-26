app.controller('EditProductController', ['$http', '$stateParams', 'Product', function($http, $params, Product) {
    var self = this;

    self.product = {photos: []};

    Product.getById(parseInt($params.id), function(data){
        self.product = data;
    });

    self.submit = function(){
        self.product.photos = [];
        self.product.photos = self.photos || [];
        debugger;
        Product.postProduct(self.product, function(response){
            self.files = [];
            self.product.photos = [];
        });
    };
}]);