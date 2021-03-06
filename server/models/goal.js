var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GoalSchema   = new Schema({
    number : Number,
	title: String,
    owner : String,
    duedate : Date,
    status : String,
    blockedreason : String,
    notes : String,
    team : { type : Array , "default" : [] },
    sims : { type : Array , "default" : [] }
});

module.exports = mongoose.model('Goal', GoalSchema);