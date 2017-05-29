var express = require('express');
var mongoose = require('mongoose');
var body = require('body-parser');
var app = express();

var db = mongoose.connect('mongodb://127.0.0.1:27017/GPHAppDB');
var approute = require('./route/application.route')();
var acctroute = require('./route/account.route.js')();

app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.use('/api', [approute, acctroute]);

app.get('/', function(req, res){
    res.send('API Service is working')
});

app.listen(3000, function(){
    console.log('Server is running in port 3000');
});