var mongoose = require('mongoose');
var schema = mongoose.Schema;
var owner = require('OwnerModel');

var CommittieModel = new Schema({
    owner: {type: owner},
    role: {type: String},
    year: {type: Number}
})