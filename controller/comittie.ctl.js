
var comittieController = function(){
    var comittie = require('../model/ComittieModel');

    var get = function(req, res){
       comittie.find({}).populate('owner').exec(function(error, result){
            if(error)
                res.status(400).send('No Data Found');
            else
                res.status(200).json(result);
        });
    }

    var post = function(req, res){
        var commitie = new comittie(req.body);
        commitie.save(function(error){
            if(error){
                return res.status(400).send('Error ' + error);
            }
            else {               
                return res.status(201).json(commitie);
            }
        });
    }

    var filiter = function(req, res, next){
        comittie.findById(req.params.id).populate('owner').exec(function(error, comit){              
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            else if(comit){             
                req.comit = comit;
                next();
            }
            else {
                res.status(401).send('No Data Found');            
            }        
        });
    }

    var put = function(req, res){
        req.comit.role = req.body.year;
        req.comit.year = req.body.month;       

        req.comit.save(function(error){
            if(error){
                return res.status(400).send('Error ' + error);
            }
            else {                
                return res.status(202).json(req.comit);
            }
        });
    }

    var patch = function(req, res){
        if(req.body._id)
          delete req.body._id;

        for(var p in req.body){
            req.comit[p] = req.body[p];
        }

        req.comit.save(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }

            res.status(203).json(req.comit);
        });
    }

    var del = function(req, res){
        req.comit.remove(function(error){
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

module.exports = comittieController;