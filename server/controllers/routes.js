var express = require('express');
var router  = express.Router();
var path = require('path');

// Other controllers
var categories = require(path.join(__dirname,  'categories'));
var products = require(path.join(__dirname,  'products'));

// Use the other controllers
router.use('/categories', categories);
router.use('/products', products);

module.exports = router;
