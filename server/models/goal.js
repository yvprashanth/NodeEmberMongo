var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GoalSchema   = new Schema({
    number : Number,
	title: String,
    owner : String,
    duedate : Date,
    status : String,
    notes : String
});

module.exports = mongoose.model('Goal', GoalSchema);
