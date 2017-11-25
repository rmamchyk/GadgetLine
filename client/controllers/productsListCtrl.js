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