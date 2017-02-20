var createSignature = require("../../helpers/create-signature");
var makeRequest = require("../../helpers/make-request");

module.exports = exec;

function exec(p_callback) {
	var config, options, callback;
	config = this.config;
	options = this.options;
	callback = p_callback;

	var url = config.endpoint + "issues/" + options.issueId + "/edits";

	var queryOptions = {
		config: config,
		url: url,
		method: "POST",
		strictSSL: false,
		body: JSON.stringify(options.body),
		headers: {
			"Content-Type": "application/json",
			date : new Date()
		}
	};

	var signature;
	createSignature(url, queryOptions, function(error, data) {
		if (error) return callback(error, null);
		signature = data;
	});

	if(!signature) return callback("Error getting issues: No signature provided");

	queryOptions.headers.Authorization = signature;

	return makeRequest(queryOptions, callback);

}
