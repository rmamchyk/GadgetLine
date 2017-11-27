var mongo = require('mongodb');
var _ = require('underscore');

var Products = {
    getItemsPerPage: function(searchObj, callback){
        var categories = mongo.DB.collection('categories');
        var products = mongo.DB.collection('products');
        var pageResult = {items: [], totalItems: 0};

        categories.find({$or: [ {id: searchObj.categoryId}, {parentId: searchObj.categoryId} ] }).toArray(function(err, docs){
            if(err){
                console.log("Problem with loading subcategoryIds by categoryId in mongodb!");
                console.log(err);
                callback(err, null);
            }else{
                var categoryIds = _.map(docs, function(doc){return doc.id;});
                products.count({categoryId: { $in: categoryIds} }, function(err, count){
                    if (err) {
                        console.log("Problem with loading products Count by categoryId in mongodb!");
                        console.log(err);
                        callback(err, null);
                    } else {
                        pageResult.totalItems = count;
                        //searchObj.categoryId

                        products.find({categoryId: { $in: categoryIds} })
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