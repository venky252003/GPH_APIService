
var ownerController = function(){

    var owner = require('../model/OwnerModel');

    var get = function(req, res){
        var query = {};

        owner.find({}).exec(function(error, result){
            if(error)
                return res.status(400).send('Error ' + error);
            else
                return res.status(200).json(result);
        });
    }

    var post = function(req, res){
        var house = new owner(req.body);
        house.save(function(error){
             if(error)
                return res.status(400).send('Error ' + error);
            else
                return res.status(201).json(house);
        });
    }

    var filiter = function(req, res, next){
        owner.findById(req.params.id).exec(function(error, owner){              
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            else if(owner){             
                req.owner = owner;
                next();
            }
            else {
                res.status(401).send('No Data Found');            
            }        
        });
    }

    var put = function(req, res){
        req.owner.name = req.body.name;
        req.owner.age = req.body.age;
        req.owner.mobile = req.body.mobile;
        req.owner.email = req.body.email;
        req.owner.flatNo = req.body.flatNo;
        req.owner.regDocNo = req.body.regDocNo;
        req.owner.created = req.body.created;

        req.owner.save(function(error){
            if(error){
                return res.status(400).send('Error ' + error);
            }
            else {                
                return res.status(202).json(req.owner);
            }
        });
    }

    var patch = function(req, res){
        if(req.body._id)
          delete req.body._id;

        for(var p in req.body){
            req.owner[p] = req.body[p];
        }

        req.owner.save(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }

            res.status(203).json(req.owner);
        });
    }

    var del = function(req, res){
        req.owner.remove(function(error){
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
        patch: patch,
        delete: del        
    }

}

module.exports = ownerController;