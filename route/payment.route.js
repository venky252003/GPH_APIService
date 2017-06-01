var express = require('express');

var paymentRoute = function(){
    var paymentCtl = require('../controller/payment.ctl')();
    var payroute = express.Router();

    payroute.route('/payment').get(paymentCtl.get).post(paymentCtl.post);
    payroute.use('/payment/:id', function(req, res, next){
        paymentCtl.filiter(req, res, next);
    });

    payroute.route('/payment/:id').get(function(req, res){
        res.status(200).json(req.pay);
    }).put(paymentCtl.put).patch(paymentCtl.patch).delete(paymentCtl.delete);

    return payroute;

}

module.exports = paymentRoute;