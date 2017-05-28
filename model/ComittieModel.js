var mongose = require('mongoose');
var schema = mongose.Schema;
var relationship = require('mongoose-relationship');

var Committe = new schema({
    role: {type: String},
    year: {type: Number},
    owner: {type: schema.ObjectId, ref:'Owner', childPath: 'children'}
});

Committe.plugin(relationship, { relationshipPathName:'committs' });

