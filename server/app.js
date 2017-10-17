// GLOBAL because it's used everywhere
path = require('path');

var express = require('express');
var app = express();

console.log(__dirname);

//middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

//methods
app.get('/', function(request, response){
    response.send("Hi there! I'm GadgetLine site\n");
});

app.listen(3000);

// Set absolute paths for partials
app.locals.basedir = path.join(__dirname, '');

module.exports = app;