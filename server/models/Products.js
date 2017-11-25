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
    get: function(id, callback){
        var collection = mongo.DB.collection('products');

        collection.findOne({code: id}, function(err, doc){
            if (err) {
                console.log("Problem with Products.get(id) in mongodb!");
                console.log(err);
                callback(err, null);
            } else {
                callback(err, doc);
            }
        });
    }
};

module.exports = Products;