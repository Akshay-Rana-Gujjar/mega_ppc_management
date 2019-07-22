var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

var rollingInSchema = new mongoose.Schema({
    created_at: String,
    heat_no: String,
    pieces : String,
    weight: String,
    burning_loss: String,
    remarks: String
});

rollingInSchema.pre("save", function(next){
    this.created_at = new Date().getTime();
    next()
})

var RollingIn = mongoose.model('rolling_in',rollingInSchema);

module.exports = RollingIn;