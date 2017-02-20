// var exec = require("./exec");

module.exports = function(p_config, p_options) {
	this.config = p_config;
	this.options = p_options;
	this.options.body = {
		pathEdits: []
	};
	return this;
};

module.exports.prototype = {
	archive: require("./archive"),
	effortSpent: require("./effort-spent"),
	exec: require("./exec"),
	subtasks: require("./subtasks"),
	title: require("./title")
};
