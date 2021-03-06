var mongose = require('mongoose');
var schema = mongose.Schema;

var ExpenseModel = new schema({
    year: {type: Number},
    month: {type: Number},
    amount: {type: Number},
    created: {type: Date},
    date: {type: Date},
    account: {type: schema.ObjectId, ref: 'Account'}
});

ExpenseModel.pre('save', function(next) {
  var currentDate = new Date();
  this.created = currentDate;
  next();
});

module.exports = mongose.model('Expense', ExpenseModel);


