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
                if (Array.isArray(product[key]) && product[key].length > 0) {
                    _.each(product[key], function (item) {
                        fd.append(key+'[]', item);
                    });
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