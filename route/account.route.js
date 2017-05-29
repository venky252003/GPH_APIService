var express = require('express');

var accountRoute = function(){
    var acctroute = express.Router();
    var acctCtl = require('../controller/account.ctl')();

    acctroute.route('/account').get(acctCtl.get).post(acctCtl.post);
    acctroute.use('/account/:id', function(req, res, next){
        acctCtl.filiter(req, res, next);
    });

    acctroute.route('/account/:id').get(function(req, res){
        res.status(200).json(req.account);
    }).put(acctCtl.put).delete(acctCtl.delete).patch(acctCtl.patch);

    return acctroute;
}

module.exports = accountRoute;