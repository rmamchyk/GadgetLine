app.service('apiService', function($http) {
    var self = this;

    self.getApiCall = function (methodName, callback) {
        $http.get(methodName)
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

    self.postApiCall = function (methodName, obj, callback) {
        $http.post(methodName, obj)
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
});

