var mongo = require('mongodb');

var Products = {
    getItemsPerPage: function(searchObj, callback){
        var collection = mongo.DB.collection('products');
        var pageResult = {items: [], totalItems: 0};

        collection.count({categoryId: searchObj.categoryId}, function(err, count){
            if (err) {
                console.log("Problem with loading products Count by categoryId in mongodb!");
                console.log(err);
                callback(err, null);
            } else {
                pageResult.totalItems = count;

                collection.find({categoryId: searchObj.categoryId})
                    .skip(searchObj.pageNumber * searchObj.pageSize)
                    .limit(searchObj.pageSize).toArray(function (err, docs) {
                        if (err) {
                            console.log("Problem with loading products per page from mongodb!");
                            callback(err, null);
                        } else {
                            pageResult.items = docs;
                            callback(err, pageResult);
                        }
                    });
            }
        });
    },
    get: function(code, callback){
        var collection = mongo.DB.collection('products');

        collection.findOne({code: code}, function(err, doc){
            if (err) {
                console.log("Problem with Products.get(id) in mongodb!");
                console.log(err);
                callback(err, null);
            } else {
                callback(err, doc);
            }
        });
    },
    update: function(product, callback){
        var collection = mongo.DB.collection('products');

        var query = {code: product.code};
        var data = {
            code: product.code,
            title: product.title,
            price: product.price,
            categoryId: product.categoryId,
            images: product.images
        };
        collection.updateOne(query, data, function(err){
            if (err) {
                console.log("Problem with Products.update(product) in mongodb!");
                console.log(err);
                callback(err);
            } else {
                callback(err);
            }
        });
    }
};

module.exports = Products;