
var accountController = function(){
    var account = require('../model/AccountModel');
    
    var get = function(req, res){
        var query = {};
        if(req.query.name){
            query.name = req.query.name;
        }

        account.find(query, function(error, result){
            if(error)
                res.status(400).send('No Data Found');
            else
                res.status(200).json(result);
        });
    }

    var post = function(req, res){
        var acct = new account(req.body);
        acct.save(function(error){
            if(error)
                return res.status(400).send('Error ' + error);
            else
                return res.status(201).json(acct)
        });
    }

    var filiter =  function(req, res, next) {
            account.findById(req.params.id, function(error, acct){              
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            else if(acct){             
                req.account = acct;
                next();
            }
            else {
                res.status(401).send('No Data Found');            
            }        
        })
    }

    var put = function(req, res){
        req.account.name = req.body.name;
        req.account.type = req.body.type;
        req.account.maintiance = req.body.maintiance;
      
        req.account.save();
        req.account.save(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            res.status(200).json(req.account);
        });
    }

    var patch = function(req, res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body){
            req.account[p] = req.body[p];
        }

        req.account.save(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }

            res.status(200).json(req.account);
        });
    }

    var dele = function(req, res){
         req.account.remove(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            res.status(204).send('Removed');
        });
    }

    return{
        get: get,
        post: post,
        filiter: filiter,
        put: put,
        delete: dele,
        patch: patch
    }

}

module.exports = accountController;