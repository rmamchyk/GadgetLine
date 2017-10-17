var express = require('express');
var router  = express.Router();
var path = require('path');

// Other controllers
var categories = require(path.join(__dirname,  'categories'));

// Use the other controllers
router.use('/categories', categories);

module.exports = router;
