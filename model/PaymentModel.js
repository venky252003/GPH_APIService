var mongoose = require('mongoose');
var schema = new mongoose.Schema;

//var relationship = require("mongoose-relationship");

var PaymentModel = new schema({
    year: {type: Number},
    month: {type: Number},
    amount: {type: Number},
    status: {type: String},
    ownerId: {type: Number},
    created: {type: Date},
    date: {type: Date},
    owner: { type:schema.ObjectId, ref:"Owner"},
    account: {type: schema.ObjectId, ref: 'Account'}
});

//PaymentModel.plugin(relationship, { relationshipPathName:['accounts', 'owners'] });

PaymentModel.pre('save', function(next) {
  var currentDate = new Date();
  this.created = currentDate;
  next();
});

module.exports = mongoose.model('Payment', PaymentModel);