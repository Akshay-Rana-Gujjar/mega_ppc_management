var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

var sizeSchema = new mongoose.Schema({
    size: String,
    shape: String,
    piece_per_kg: String
});

var Size = mongoose.model('sizes', sizeSchema);

module.exports = Size;