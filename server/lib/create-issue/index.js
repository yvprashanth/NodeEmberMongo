var exec = require("./exec");

module.exports = function(p_config, p_options, p_callback) {

	// config is passed in through the chain call of simClient.getIssues();
	// if options and callback are present (simClient.getIssues(options, callback))
	// then we can assume the script is calling get issues directly with a already
	// formed query string.
	if(p_config && p_options && p_callback) {
		return exec(p_config, p_options, p_callback);
	}

	// if p_options and p_callback don't exist, then the query string is being chained.
	// config will be under "this.config", passed from the original chain
	if(!p_options && !p_callback) {
		this.firstCall = true;
		this.config = p_config;
		this.options = {};
		return this;
	}

};

module.exports.prototype = {
	exec: exec,
	assignedFolder: require("./assigned-folder"),
	description: require("./description"),
	descriptionContentType: require("./description-content-type"),
	labels: require("./labels"),
	priority: require("./priority"),
	requesterIdentity: require("./requester-identity"),
	title: require("./title"),
	ttImpact: require("./tt-impact"),
	watchers: require("./watchers")
};
