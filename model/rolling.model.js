var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

var rollingSchema = new mongoose.Schema({
    party : String,
    challan_no: String,
    shape: String,
    input_size : String,
    ingot_pcs : String,
    output_size: String,
    heat_no: String,
    pieces : String,
    weight: String,
    status: String,
    no_ingot_pcs: String
    

});



var Rolling = mongoose.model('rolling',rollingSchema);

module.exports = Rolling;