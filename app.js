var express = require('express');
var mongoose = require('mongoose');
var body = require('body-parser');
var app = express();

var db = mongoose.connect('mongodb://127.0.0.1:27017/GPHAppDB');
var approute = require('./route/application.route')();
var acctroute = require('./route/account.route')();
var payroute = require('./route/payment.route')();
var owner = require('./route/owner.route')();
var commitie = require('./route/comittie.route')();
var utility = require('./route/utlity.route')();

app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.use('/api', [approute, acctroute, payroute, owner, commitie, utility]);

app.get('/', function(req, res){
    res.send('API Service is working')
});

app.listen(3000, function(){
    console.log('Server is running in port 3000');
});