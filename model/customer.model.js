var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

var customerSchema = new mongoose.Schema({
    name : String,
    address: String,
    mobile: String,
    website: String,
    gst: String,
    delivery_address :String

});

var Customer = mongoose.model('customers',customerSchema);

module.exports = Customer;