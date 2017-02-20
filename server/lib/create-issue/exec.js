var _ = require("lodash");
var createSignature = require("../../helpers/create-signature");
var makeRequest = require("../../helpers/make-request");

module.exports = exec;

function exec(p_config, p_options, p_callback) {
	var config, options, callback;

	// if all three exist, we can assume it was called directly from getIssues
	if(p_config && p_options && p_callback) {
		config = p_config;
		options = p_options;
		callback = p_callback;
	}

	// if the first variable is a function, assume its actually the callback,
	// and exec is being called through the chain.
	if(_.isFunction(p_config)) {
		config = this.config;
		options = this.options;
		callback = p_config;
	}

	var url = config.endpoint + "issues";

	var requestOptions = {
		config: config,
		url: url,
		method: "POST",
		strictSSL: false,
		body: JSON.stringify(options),
		headers: {
			"Content-Type": "application/json",
			date : new Date()
		}
	};

	var signature;
	createSignature(url, requestOptions, function(error, data) {
		if (error) return callback(error, null);
		signature = data;
	});

	if(!signature) return callback("Error creating issue: No signature provided");

	requestOptions.headers.Authorization = signature;

	return makeRequest(requestOptions, callback);
}
