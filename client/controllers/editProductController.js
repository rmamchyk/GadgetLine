app.controller('EditProductController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance, productData) {
    $scope.product = productData;

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function() {
        $uibModalInstance.close($scope.product);
    };
}]);