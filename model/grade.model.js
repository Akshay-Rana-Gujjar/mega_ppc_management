var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/inventory_sample',{ useNewUrlParser: true });

var gradeSchema = new mongoose.Schema({
    name : String
});

var Grade = mongoose.model('grades',gradeSchema);

module.exports = Grade;