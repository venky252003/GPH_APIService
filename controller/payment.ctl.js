
var paymentController = function(){
    var payment = require('../model/PaymentModel');
    //var account = require('../model/AccountModel');

    var get = function(req, res){

        payment.find({}).populate('account owner').exec(function(error, result){
            if(error)
                res.status(400).send('No Data Found');
            else
                res.status(200).json(result);
        });
    }

    var post = function(req, res){
        var pay = new payment(req.body);
        pay.save(function(error){
            if(error){
                return res.status(400).send('Error ' + error);
            }
            else {
                /*account.findById(pay.account, function(error, acct){
                    acct.payment = pay;
                    acct.save(function(error){
                        console.log('Error ' + error);
                    });
                });*/
                return res.status(201).json(pay);
            }
        });
    }

    var filiter = function(req, res, next){
        payment.findById(req.params.id).populate('account owner').exec(function(error, pay){              
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            else if(pay){             
                req.pay = pay;
                next();
            }
            else {
                res.status(401).send('No Data Found');            
            }        
        });
    }

    var put = function(req, res){
        req.pay.year = req.body.year;
        req.pay.month = req.body.month;
        req.pay.amount = req.body.amount;
        req.pay.status = req.body.status;
        req.pay.created = req.body.created;
        req.pay.type = req.body.type;
        req.pay.date = req.body.date;

        req.pay.save(function(error){
            if(error){
                return res.status(400).send('Error ' + error);
            }
            else {                
                return res.status(202).json(req.pay);
            }
        });
    }

    var patch = function(req, res){
        if(req.body._id)
          delete req.body._id;

        for(var p in req.body){
            req.pay[p] = req.body[p];
        }

        req.pay.save(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }

            res.status(203).json(req.pay);
        });

    }

    var del = function(req, res){
        req.pay.remove(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            res.status(204).send('Removed');
        });
    }

    return {
        get: get,
        post: post,
        filiter: filiter,
        put: put,
        patch: patch,
        delete: del
    }
}

module.exports = paymentController;