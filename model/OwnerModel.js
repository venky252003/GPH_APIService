var mongoose = require('mongoose');
var schema = mongoose.Schema;

var Owner = new Schema({
    name: {type: String, require: true},
    age: {type: String},
    mobile: {type: Number, require: true},
    email: {type: String},
    flatNo: {type: String},
    regDocNo: {type: string},
    created: {type: Date}
});

Owner.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the created field to current date
  this.created = currentDate;

  // if created_at doesn't exist, add to that field
  //if (!this.created)
  //  this.created = currentDate;

  next();
});

module.exports = mongoose.model('Owner', Owner);