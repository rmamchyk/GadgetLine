app.controller('MainController',['$http', function($http) {
    var vm = this;
    vm.names = ['roman', 'natalia', 'ruslan'];
    vm.categories = [];
    vm.selectedCategory = {id: 1};
    vm.productsData = {
            totalItems: 0,
            pageNumber: 1,
            pageSize: 25,
            items: []
    };
    vm.searchQuery = null;
    vm.categoriesMenuOpened = true;

    //load products by page for selected category.
    vm.searchProducts = function () {
        var pageRequest = {
            pageNumber: vm.productsData.pageNumber - 1,
            pageSize: vm.productsData.pageSize,
            categoryId: vm.selectedCategory.id
        };

        $http({ method: 'POST', url: '/products/search', data: JSON.stringify(pageRequest)})
            .then(function(response){
            var pageResult = response.data;
            vm.productsData.items = pageResult.items;
            vm.productsData.totalItems = pageResult.totalItems;
        }, function(){
            console.log("GET /products/search request FAILED");
        });
    };
    vm.searchProducts();

    //load all category list.
    $http({ method: 'GET', url: '/categories' }).then(function(response){
        vm.categories = response.data;

        if (vm.categories.length > 0) {
            var prevCategoryId = vm.selectedCategory.id;
            vm.selectedCategory = vm.categories[0];
            if(prevCategoryId != vm.selectedCategory.id){
                vm.productsData.pageNumber = 1;
                vm.searchProducts();
            }

        }
    }, function(){
        console.log("GET /categories request FAILED");
    });

    vm.changeCategory = function (event, selected) {
        var prevCategoryId = vm.selectedCategory.id;
        vm.selectedCategory = selected;
        if(prevCategoryId != vm.selectedCategory.id) {
            vm.productsData.pageNumber = 1;
            vm.searchProducts();
        }
        event.stopPropagation();
    };

    vm.toggleCategoriesMenu = function() {
        vm.categoriesMenuOpened = !vm.categoriesMenuOpened;
    };
}]);