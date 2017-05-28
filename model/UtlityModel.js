var mongoose = require('mongoose');
var schema = mongoose.Schema;


var UtlityModel = new schema({
    name: {type: String},
    mobile: {type: String},
    type : {type: String}
});

module.exports = mongoose.model('Utlity', UtlityModel);