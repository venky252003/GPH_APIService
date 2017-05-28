var express = require('express');
var mongoose = require('mongoose');
var body = require('body-parser');
var relationship = require('mongoose-relationship');
var app = express();

var db = mongoose.connect('mongodb://127.0.0.1:27017/GPHAppDB');
var Utlity = require('./model/UtlityModel');
var Account = require('./model/AccountModel');
var Expense = require('./model/ExpenseModel');

/*

var Application = require('./model/ApplicationModel');
var Committie = require('./model/ComittieModel');

var Owner = require('./model/OwnerModel');
var Payment = require('./model/PaymentModel');
*/

app.use(body.urlencoded({extended: true}));
app.use(body.json());

app.get('/', function(req, res){
    res.send('API Service is working')
});

app.listen(3000, function(){
    console.log('Server is running in port 3000');
});