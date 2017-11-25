app.controller('EditProductController', ['$http', '$stateParams', function($http, $params) {
    var self = this;

    self.code = $params.code;
}]);