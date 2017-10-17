var mongo = require('mongodb');

var Categories = {
    all: function(callback){
        var collection = mongo.DB.collection('categories');

        collection.find().toArray(function(err, docs) {
            if(err){
                console.log(err);
                console.log("Problem with loading Products from mongodb!");
            }else{
                callback(err, docs);
            }
        });
    }
};

module.exports = Categories;