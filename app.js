var express = require('express');
var mongoose = require('mongoose');
var body = require('body-parser');
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var mongodb_connection_string;
var db_name = 'gphAppdb';
//provide a sensible default for local development
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

var db = mongoose.connect(mongodb_connection_string);
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

app.listen(server_port, server_ip_address, function(){
    console.log('Server is running in port ' + server_port + ' host ' + server_ip_address);
});

module.exports = app;