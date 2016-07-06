var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    menu: {type: String, required: true},
    restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true}
});

module.exports = mongoose.model('Menu', schema);