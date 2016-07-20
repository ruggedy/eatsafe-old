var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Restaurant = require('./restaurant') 

var schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    menu: {type: String, required: true},
    allergens:[{type: String}],
    restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true}
});

schema.post('remove', function(doc) {
    var deletedMenu = doc;
    Restaurant.findById(deletedMenu.restaurant, function(err, doc) {
        doc.menu.pull(deletedMenu);
        doc.save();
    })
})

module.exports = mongoose.model('Menu', schema);