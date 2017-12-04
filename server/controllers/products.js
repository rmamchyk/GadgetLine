var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var multer = require('multer');
var _ = require('underscore');
var fs = require('fs');

var Products = require(path.join(__dirname, '..', 'services', 'products'));

router.post('/list', jsonParser, function(req, res){
        var searchInfo = req.body || {};

        Products.getItemsPerPage(searchInfo, function(err, docs){
            if(!err){
                res.json(docs);
            }
        });
});

router.get('/:id', function(req, res){
    var productCode = req.params.id;

    Products.get(productCode, function(err, doc){
        if(!err){
            res.json(doc);
        }
    })
});

//uploading product images
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname, '../../', 'public/uploads/'))
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
});
var upload = multer({storage: storage}).fields([{ name: 'photos[]', maxCount: 10 }]);
router.post('/update', function(req, res){
    upload(req, res, function(err){
        if(!err){
            var data = req.body;
            var product = {
                _id: data._id,
                code: data.code,
                title: data.title,
                price: parseFloat(data.price),
                categoryId: parseInt(data.categoryId),
                images: data.images || []
            };
            Products.get(product.code, function(err, existing){
                if(!err){
                    var filesToDelete = _.filter(existing.images || [], function(img){
                        return !_.contains(product.images, img);
                    });

                    console.log('Files to delete: ' + filesToDelete);

                    _.each(filesToDelete, function(filename){
                        fs.unlink(path.join(__dirname, '../../', 'public/uploads/')+filename, function(err) {
                            if (err) {
                                console.log('Problem with deleting file ' + filename)
                            }else{
                                console.log('Deleted '+filename+'!');
                            }
                        });
                    });

                    Products.update(product, function(err){
                        res.json({success: !err, product: product});
                    });
                }
            });
        }
    });
});

module.exports = router;
