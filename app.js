var express = require('express');
var mongoose = require('mongoose');
var body = require('body-parser');
var ejs = require('ejs');
var app = express();

app.engine('html', require('ejs').renderFile);
//Deployment code
//Start
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || 'localhost',// '0.0.0.0', 
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

////127.0.0.1:27017/

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}
else
{
    mongoURL = 'mongodb://127.0.0.1:27017/gphAppdb';
}

var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
  if (mongoURL == null) return;
 
  var db = mongoose.connect(mongoURL, function(error){    
    // callback(error);
     // return;
  });

  dbDetails.databaseName = db.databaseName;
  dbDetails.url = mongoURLLabel;
  dbDetails.type = 'MongoDB';  

  console.log('Connected to MongoDB at: %s', db);
};

//END


/*var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var mongodb_connection_string;
var db_name = 'gphAppdb';*/

//provide a sensible default for local development
//mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
/*if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}*/

//var db = mongoose.connect(mongodb_connection_string);
//app.set('views', '/views');
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
    if (!db) {
        initDb(function(err){});
    }
    res.render('index.html');
    //res.send('API Service is working')
});

initDb(function(err){
  console.log('Error connecting to Mongo. Message:\n'+err);
});


app.listen(port, ip, function(){
    console.log('Server running on http://%s:%s', ip, port);
});


module.exports = app ;