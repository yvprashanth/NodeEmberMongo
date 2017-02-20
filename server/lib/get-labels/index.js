var _ = require("lodash");
var exec = require("./exec");
var standardQueryBuilder = (require("./standard-query-builder"));

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
	this.firstCall = true;
	this.config = p_config;
	this.options = { queryString: "" };
	if(p_options) {
		this.options = _.merge(this.options, p_options);
	}
	return this;

};

module.exports.prototype = {
	assignedFolder: standardQueryBuilder("assignedFolder"),
	exec: exec
};
