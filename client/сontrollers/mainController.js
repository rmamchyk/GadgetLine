app.controller('MainController',['$scope', 'apiService', function($scope, apiService) {
    $scope.models = {
        categories: []
    };

    $scope.searchQuery = null;

    $scope.selectedCategory = null;
    $scope.categoriesMenuOpened = true;

    $scope.searchProducts = function () {
        if ($scope.getProductData && typeof $scope.getProductData == "function") {
            $scope.getProductData();
        };
    };

    $scope.changeCategory = function (event, selected) {
        $scope.selectedCategory = selected;
        event.stopPropagation();
    }

    $scope.toggleCategoriesMenu = function() {
        $scope.categoriesMenuOpened = !$scope.categoriesMenuOpened;
    }

    var getCategoryData = function() {

        $scope.models.categories = [
            {Id: 1, Name: 'Планшеты', ParentId: null},
            {Id: 2, Name: 'Ноутбуки', ParentId: null},
            {Id: 3, Name: 'Телефоны', ParentId: null}
        ];

        if ($scope.models.categories.length > 0) {
            $scope.selectedCategory = $scope.models.categories[0];
            if ($scope.getProductData && typeof $scope.getProductData == "function") {
                $scope.getProductData();
            }
        }
    };

    getCategoryData();
}]);