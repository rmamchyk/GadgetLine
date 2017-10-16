var express = require('express');
var app = express();


app.get('/', function(request, response){
    response.send("Hi there! I'm GadgetLine site\n");
});


app.listen(3000);