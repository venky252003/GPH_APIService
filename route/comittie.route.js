var express = require('express');

var commitieRoute = function(){
    var commitieroute = express.Router();
    var commitieCtl = require('../controller/comittie.ctl')();

    commitieroute.route('/commitie').get(commitieCtl.get).post(commitieCtl.post);
    commitieroute.use('/commitie/:id', function(req, res, next){
        commitieCtl.filiter(req, res, next);
    });

    commitieroute.route('/owner/:id').get(function(req, res){
        return res.status(200).json(req.comit);
    }).put(commitieCtl.put).patch(commitieCtl.patch).delete(commitieCtl.delete);

    return commitieroute;
}

module.exports = commitieRoute;