var apiService = function($http) {
    var self = this;

    self.getApiCall = function (controllerName, methodName, callback) {
        $http.get('api/' + controllerName + '/' + methodName)
            .then(function (response) {
                var event = {
                    result: response.data,
                    hasErrors: false
                };
                callback(event);
            }, function (response) {
                var event = {
                    result: null,
                    hasErrors: true,
                    error: response.statusText
                }
                callback(event);
            });
    };

    self.postApiCall = function (controllerName, methodName, obj, callback) {
        $http.post('api/' + controllerName + '/' + methodName, obj)
            .then(function (response) {
                var event = {
                    result: response.data,
                    hasErrors: false
                };
                callback(event);
            }, function (response) {
                debugger;
                var event = {
                    result: null,
                    hasErrors: true,
                    error: response.statusText
                }
                callback(event);
            });
    };
};