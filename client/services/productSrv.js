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