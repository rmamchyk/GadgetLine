app.component('productsView', {
    templateUrl: '../views/components/products-view.html',
    bindings: {
        data: '='
    },
    controller: function(){
        this.pageChanged = function(){

        }
    },
    controllerAs: 'vm'
});