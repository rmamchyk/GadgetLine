app.controller('EditProductController', ['$http', '$stateParams', 'Product', '_', function ($http, $params, Product, _) {
    var self = this;

    self.photos = [];
    self.previews = [];

    self.product = {photos: []};

    Product.get($params.id, function (data) {
        if (data) {
            self.product._id = data._id;
            self.product.code = data.code;
            self.product.title = data.title;
            self.product.price = data.price;
            self.product.categoryId = data.categoryId;
            self.product.images = data.images || [];
        }
    });

    var getFileExtension = function (filename) {
        var r = /.+\.(.+)$/.exec(filename);
        return r ? r[1] : null;
    };

    self.submit = function () {
        self.product.photos = [];
        _.each(self.photos || [], function (item) {
            //Todo: Store a new photo with filename as: product.code + '-' + random id.
            //item.code = self.product.code;
            //item.name = self.product.code + '.' + getFileExtension(item.name);
            self.product.photos.push(item);
        });
        Product.post(self.product, function (res) {
            if (res.success) {
                console.log(res.product);
                res.product.photos = [];
                self.product = res.product;
            }
            self.photos = [];
            self.previews = [];
        });
    };
}]);