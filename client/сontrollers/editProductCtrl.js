var EditProductController = function ($scope, $uibModalInstance, data) {
    $scope.product = data;

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function() {
        $uibModalInstance.close($scope.product);
    };
};