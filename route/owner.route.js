var express = require('express');

var ownerRoute = function(){
    var ownerroute = express.Router();
    var ownerCtl = require('../controller/owner.ctl')();

    ownerroute.route('/owner').get(ownerCtl.get).post(ownerCtl.post);
    ownerroute.use('/owner/:id', function(req, res, next){
        ownerCtl.filiter(req, res, next);
    });

    ownerroute.route('/owner/:id').get(function(req, res){
        return res.status(200).json(req.owner);
    }).put(ownerCtl.put).patch(ownerCtl.patch).delete(ownerCtl.delete);

    return ownerroute;
}

module.exports = ownerRoute;
