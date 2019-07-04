var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

// shape
var ShapeSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    }
});

var Shape = mongoose.model('shape', ShapeSchema);

module.exports = Shape;