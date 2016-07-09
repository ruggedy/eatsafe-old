var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    validated: {type: Boolean, required: true, default: false},
    restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'}
});

module.exports = mongoose.model('User', schema)