var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    location: {
        address:{type: String, required: true},
        postcode:{type: String, required: true},
        city:{type: String, required: true},
    },
    opening: [{
        day:{type: String, required: true},
        starttime:{type: Number, required: true},
        endtime:{type: Number, required: true},
        closed: {type: Boolean, required: true, default: true}
    }],
    photos: {type: String},
    contact: {
        email:{type: String, required: true},
        phone:{type: String, required: true}
    },
    menu: [{type: Schema.Types.ObjectId, ref: 'Menu'}],
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Restaurant', schema);