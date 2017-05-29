

var applicationController = function(){
    var application = require('../model/ApplicationModel');

    var post = function(req, res){       
        var app = new application(req.body);
        app.save(function(error){
            if(error){
                res.status(400).send(error);
            }
            else{
                res.status(201).json(app);
            }
        });        
    }

    var get = function(req, res){
        var query = {};
            if(req.query.name){
                query.name = req.query.name;
        }

        application.find(query, function(error, app){
            if(error)
                res.send('Error ' + error);

            return res.status(200).json(app);
        });
    }

    var filiter =  function(req, res, next) {
            application.findById(req.params.id, function(error, app){              
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            else if(app){             
                req.app = app;
                next();
            }
            else {
                res.status(401).send('No Data Found');            
            }        
        })
    }

    var put = function(req, res){
        req.app.name = req.body.name;
        req.app.address = req.body.address;
        req.app.bulider = req.body.bulider;
        req.app.survayNo = req.body.survayNo;

        req.app.save();
        req.app.save(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            res.status(200).json(req.app);
        });
    };

    var patch = function(req, res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body){
            req.app[p] = req.body[p];
        }

        req.app.save(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }

            res.status(200).json(req.app);
        });
    };

    var del = function(req, res){       
        req.app.remove(function(error){
            if(error){
                console.log(error);
                res.status(500).send('Error ' + error);
            }
            res.status(204).send('Removed');
        });
    };

    return {
        post: post,
        get: get,
        filiter: filiter,
        put: put,
        delete: del,
        patch: patch
    }

}

module.exports = applicationController;