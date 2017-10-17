app.controller('MainController',['$scope', '$http', function($scope, $http) {
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
        debugger;
        $scope.selectedCategory = selected;
        event.stopPropagation();
    }

    $scope.toggleCategoriesMenu = function() {
        $scope.categoriesMenuOpened = !$scope.categoriesMenuOpened;
    }

    var getCategoryData = function() {
        $.ajax({
            type: 'GET',
            url: '/categories',
            contentType: 'application/json',
            dataType: 'json',
            success: function(result){
                debugger;
                $scope.models.categories = result;

                if ($scope.models.categories.length > 0) {
                    $scope.selectedCategory = $scope.models.categories[0];
                    if ($scope.getProductData && typeof $scope.getProductData == "function") {
                        $scope.getProductData();
                    }
                }
            },
            error: function(){
                console.log("GET /categories request FAILED");
            }
        });

    };

    getCategoryData();
}]);