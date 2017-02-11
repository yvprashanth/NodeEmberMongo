var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
	title: 'string',
	content: 'string',
	author: 'string'
});

var NoteModel = mongoose.model('note', noteSchema);

module.exports = NoteModel;