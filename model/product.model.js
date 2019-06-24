var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

var productSchema = new mongoose.Schema({
    name : String,
    ready: Number,
    required: Number,
    size : String,
    wt_per_peice : String,
    grade : String

});

var Product = mongoose.model('products',productSchema);

module.exports = Product;