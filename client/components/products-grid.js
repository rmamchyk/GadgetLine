app.component('productsGrid', {
    templateUrl: '../views/components/products-grid.html',
    bindings: {
        data: '='
    },
    controller: function(){
        this.pageChanged = function(){

        }
    },
    controllerAs: 'vm'
});