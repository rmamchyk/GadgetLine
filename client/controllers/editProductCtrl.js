app.controller('EditProductController', ['$http', '$stateParams', 'Product', '_', function ($http, $params, Product, _) {
    var self = this;

    self.photos = [];
    self.previews = [];
    self.mainImage = '../images/no-photo.png';

    self.product = {photos: []};

    Product.get($params.id, function (data) {
        if (data) {
            self.product._id = data._id;
            self.product.code = data.code;
            self.product.title = data.title;
            self.product.price = data.price;
            self.product.categoryId = data.categoryId;
            self.product.images = data.images || [];
            if(self.product.images && self.product.images.length > 0){
                self.mainImage = '../uploads/' + self.product.images[0];
            }
        }
    });

    self.selectImage = function(img){
        self.mainImage = '../uploads/' + img;
    };

    self.selectPreview = function(preview){
        self.mainImage = preview.src;
    };

    self.deleteImage = function(img){
        var imgIndex = self.product.images.indexOf(img);
        if(imgIndex > -1){
            if(self.product.images.length == 1){
                if(self.previews.length > 0){
                    self.mainImage = self.previews[0].src;
                }else{
                    self.mainImage = '../images/no-photo.png';
                }
                self.product.images.splice(imgIndex, 1);
            }else{
                self.product.images.splice(imgIndex, 1);
                self.mainImage = '../uploads/' + self.product.images[0];
            }
        }
    };

    self.deletePreview = function(preview){
        var previewIndex = self.previews.indexOf(preview);
        if(previewIndex > -1){
            if(self.previews.length == 1){
                if(self.product.images.length > 0){
                    self.mainImage = '../uploads/' + self.product.images[0];
                }else{
                    self.mainImage = '../images/no-photo.png';
                }
                self.previews.splice(previewIndex, 1);
                self.photos.splice(previewIndex, 1);
            }else{
                self.previews.splice(previewIndex, 1);
                self.photos.splice(previewIndex, 1);
                self.mainImage = self.previews[0].src;
            }
        }
    };

    self.submit = function () {
        self.product.photos = [];
        _.each(self.photos || [], function (item) {
            self.product.photos.push(item);
        });
        Product.post(self.product, function (res) {
            if (res.success) {
                res.product.photos = [];
                self.product = res.product;
                if(self.product.images && self.product.images.length > 0){
                    self.mainImage = '../uploads/' + self.product.images[0];
                }
                self.photos = [];
                self.previews = [];
            }
        });
    };
}]);