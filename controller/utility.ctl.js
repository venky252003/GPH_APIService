
var utilityController = function(){
    var utility = require('../model/UtlityModel');

    var get = function(req, res){
       utility.find({}).exec(function(error, result){
            if(error)
                res.status(400).send('No Data Found');
            else
                res.status(200).json(result);
        });
    }

    var post = function(req, res){
        var uti = new utility(req.body);
        uti.save(function(error){
            if(error){
                return res.status(400).send('Error ' + error);
            }
            else {               
                return res.status(201).json(uti);
            }
        });
    }

    var filiter = function(req, res, next){
        utility.findById(req.params.id).exec(function(error, uti){              
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            else if(uti){             
                req.uti = uti;
                next();
            }
            else {
                res.status(401).send('No Data Found');            
            }        
        });
    }

    var put = function(req, res){
        req.uti.name = req.body.name;
        req.uti.mobile = req.body.mobile;      
        req.uti.type = req.body.type;       

        req.uti.save(function(error){
            if(error){
                return res.status(400).send('Error ' + error);
            }
            else {                
                return res.status(202).json(req.uti);
            }
        });
    }

    var patch = function(req, res){
        if(req.body._id)
          delete req.body._id;

        for(var p in req.body){
            req.uti[p] = req.body[p];
        }

        req.uti.save(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }

            res.status(203).json(req.uti);
        });
    }

    var del = function(req, res){
        req.uti.remove(function(error){
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

module.exports = utilityController;