var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore');

var Categories = require(path.join(__dirname, '..', 'services', 'categories'));

var loadSubcategories = function(root, categoriesList){
    var subcategories = _.filter(categoriesList, function(item){
        return item.parentId && item.parentId == root.id;
    });
    _.each(subcategories, function(sub){
        sub.subcategories = loadSubcategories(sub, categoriesList);

    });
    return subcategories;
};

var buildHierarchyTree = function(categoriesList){
    var rootCategories = _.filter(categoriesList, function(item){ return item.parentId == null;});
    _.each(rootCategories, function(root){
        root.subcategories = loadSubcategories(root, categoriesList);
    });
    return rootCategories;
};

router.get('/', function(req, res){
        Categories.all(function(error, docs){
            if(error){
                console.log(error);
            }else{
                var categoriesTree = buildHierarchyTree(docs || []);
                res.json(categoriesTree);
            }
        });
});

module.exports = router;
