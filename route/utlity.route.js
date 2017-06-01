var express = require('express');

var utilityRoute = function(){
    var utilityroute = express.Router();
    var utilityCtl = require('../controller/utility.ctl')();

    utilityroute.route('/utility').get(utilityCtl.get).post(utilityCtl.post);
    utilityroute.use('/utility/:id', function(req, res, next){
        utilityCtl.filiter(req, res, next);
    });

    utilityroute.route('/utility/:id').get(function(req, res){
        return res.status(200).json(req.uti);
    }).put(utilityCtl.put).patch(utilityCtl.patch).delete(utilityCtl.delete);

    return utilityroute;
}

module.exports = utilityRoute;
