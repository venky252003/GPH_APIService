var mongose = require('mongoose');
var schema = mongose.Schema;
var relationship = require('mongoose-relationship');

var AccountModel = new schema({
    name: {type: String},
    type: {type: String},
    maintiance: {type: String},
    payment: [{type: schema.ObjectId, ref: 'Payment' }],
    expense: [{type: schema.ObjectId, ref: 'Expense'}]
});

module.exports = mongose.model('Account', AccountModel);