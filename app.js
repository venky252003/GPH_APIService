var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('API Service is working')
});

app.listen(3000, function(){
    console.log('Server is running in port 3000');
});