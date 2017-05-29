var express = require('express');

var appRoute = function(){   
    var approute = express.Router();
    var appCtl = require('../controller/application.ctl')();

    approute.use('/application/:id', function(req, res, next){      
        appCtl.filiter(req, res, next);
    });

    approute.route('/application').post(appCtl.post).get(appCtl.get);
    approute.route('/application/:id')
        .get(function(req, res){           
            res.status(200).json(req.app);
        })
        .put(appCtl.put)
        .delete(appCtl.delete)
        .patch(appCtl.patch);

    return approute;
}

module.exports = appRoute;