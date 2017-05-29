var mongose = require('mongoose');
var schema = mongose.Schema;
var relationship = require('mongoose-relationship');

var AccountModel = new schema({
    name: {type: String, required: true},
    type: {type: String},
    maintiance: {type: String},
    payment: [{type: schema.ObjectId, ref: 'Payment' }]   
});

module.exports = mongose.model('Account', AccountModel);