var mongose = require('mongoose');
var schema = mongose.Schema;

var ApplicationModel = new schema({
    name: { type: String, required: true},
    address: { type: String, required: true },
    bulider: { type: String, required: true },
    survayNo: {type: String, required: true}
});

module.exports = mongose.model('Application', ApplicationModel);