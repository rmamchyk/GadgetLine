app.controller('MainController',['$http', function($http) {
    var self = this;

    self.categoriesMenuOpened = true;

    self.categories = [];

    self.selectedCategoryId = 1;

    self.searchQuery = '';

    self.loadCategories = function(){
        $http({ method: 'GET', url: '/categories' }).then(function(response){
            self.categories = response.data || [];
        }, function(){
            console.log("GET /categories request FAILED");
        });
    };

    self.toggleCategoriesMenu = function() {
        self.categoriesMenuOpened = !self.categoriesMenuOpened;
    };

    self.changeCategory = function(event, category){
        self.selectedCategoryId = category.id;
    };


    self.searchProducts = function(){

    };

    self.loadCategories();
}]);