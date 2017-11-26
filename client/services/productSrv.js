app.factory('Product', ['$http', function ($http){
    return {
        getById: function(productId, successCallback){
             $http.get('/products/'+productId)
                .then(function(response){
                    successCallback(response.data);
                }, function(){
                    console.log("GET /products/:id request has failed.");
                });
        },
        postProduct: function(product, successCallback){
            var fd = new FormData();
            debugger;
            for(var key in product){
                fd.append(key, product[key]);
            }

            $http.post('/products/update', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(function(response){
                successCallback(response.data);
            }, function(){
                console.log("POST /products/update request has failed.");
            });
        }
    }
}]);