var ProductGridController = function(apiService, $scope, $uibModal, $log) {
    $scope.data = {
        productsData: {
            totalItems: 0,
            pageNumber: 1,
            pageSize: 15,
            categoryId: null,
            data: []
        }
    };

    $scope.editProduct = function(product) {
        var modalInstanse = $uibModal.open({
            animation: true,
            templateUrl: '/client/views/editProduct.html',
            controller: 'EditProductController',
            size: '',
            resolve: {
                data: product
            }
        });

        modalInstanse.result.then(function(editedProduct) {
            $scope.data.productsData.selectedProduct = editedProduct;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.getProductData = function() {
        if ($scope.selectedCategory) {


            var db = [
                {
                    Id: 1,
                    Code: 001,
                    Title: "Lenovo IdeaPad",
                    Price: 345.70,
                    CategoryId: 1
                },
                {
                    Id: 2,
                    Code: 002,
                    Title: "Macbook OS X",
                    Price: 2345,
                    CategoryId: 2
                },
                {
                    Id: 3,
                    Code: 003,
                    Title: "Nokia 1020",
                    Price: 345.70,
                    CategoryId: 3
                },
                {
                    Id: 4,
                    Code: 004,
                    Title: "Meizu U20",
                    Price: 410.35,
                    CategoryId: 3
                }
            ];

            $scope.data.productsData.data = db.filter(function(prod){
                return prod.CategoryId == $scope.selectedCategory.Id;
            });

            $scope.data.productsData.totalItems = 4;
        }
    };

    $scope.pageChanged = function() {
        $scope.getProductData();
    }

    $scope.$watch('selectedCategory', function() {
        $scope.data.productsData.pageNumber = 1;
        $scope.getProductData();
    });
};