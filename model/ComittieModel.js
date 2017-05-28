var mongose = require('mongoose');
var schema = mongose.Schema;
//var relationship = require('mongoose-relationship');

var Committe = new schema({
    role: {type: String},
    year: {type: Number},
    owner: {type: schema.ObjectId, ref:'Owner'}
});

//Committe.plugin(relationship, { relationshipPathName:'committs' });

module.exports = mongose.model('Committe', Committe);

