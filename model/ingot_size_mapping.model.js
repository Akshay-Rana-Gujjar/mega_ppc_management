var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

var ingotSizeMappingSchema = new mongoose.Schema({
    ingot_size: String,
    substitute_ingot_size: String,
    shape_size : String,
    shape: String,
    kg_per_piece: String
});

var IngotSizeMapping = mongoose.model('ingot_size_mapping', ingotSizeMappingSchema);

module.exports = IngotSizeMapping;