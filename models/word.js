const mongoose = require('mongoose');

let wordSchema = new mongoose.Schema({
	word: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true
	},
	location: {
		type: Number,
		require: true
	},
	timestamp: { 
		type: Date, 
		default: Date.now 
	}
});

const Word = mongoose.model('Word', wordSchema);

exports.Word = Word;
