var _ = require("lodash");

module.exports = function(p_config) {
    this.config = _.merge(_.cloneDeep(require("../config")), p_config);
	return this;
};

module.exports.prototype = {
    getIssues: function (p_options, p_callback) {
        var GetIssues = require("./get-issues");
		return new GetIssues(this.config, p_options, p_callback);
	},
	createIssue: function(p_options, p_callback) {
		var CreateIssue = require("./create-issue");
		return new CreateIssue(this.config, p_options, p_callback);
	},
	updateIssue: function(p_options) {
		var UpdateIssue = require("./update-issue");
		return new UpdateIssue(this.config, p_options);
	},
	getLabels: function(p_options, p_callback) {
		var GetLabels = require("./get-labels");
		return new GetLabels(this.config, p_options, p_callback);
	}
};
