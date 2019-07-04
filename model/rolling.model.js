var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

var rollingSchema = new mongoose.Schema({
    rolling_mill : String,
    challan_no: String,
    shape: String,
    ingot_size : String,
    ingot_weight : String,
    created_at: String,
    grade : String,
    shape_size: String,
    heat_no: String,
    pieces : String,
    weight: String,
    status: String,
    burning_loss: String,
    remarks: String
});



var Rolling = mongoose.model('rolling',rollingSchema);

module.exports = Rolling;