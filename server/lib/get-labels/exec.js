var _ = require("lodash");
var querystring = require("querystring");
var createSignature = require("../../helpers/create-signature");
var makeRequest = require("../../helpers/make-request");

module.exports = exec;

function exec(p_config, p_options, p_callback) {
	var config, options, callback;

	// if all three exist, we can assume it was called directly from getLabels
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

	options.queryString = options.queryString + " AND status:Active";

	var query = {
		q : options.queryString,
		sort: options.sort ? options.sort : "label.en_US asc",
		authQuery: "operation:CAN_USE",
		cacheKey: "user:labels",
		start: 0
	};

	var url = config.endpoint + "labels";
	var urlForSignature = url + "?" + querystring.stringify(query);
	var queryOptions = {
		config: config,
		url: url,
		method: "GET",
		strictSSL: false,
		body: " ",
		qs: query,
		headers: {
			"Content-Type": "application/json",
			date : new Date()
		}
	};

	var signature;
	createSignature(urlForSignature, queryOptions, function(error, data) {
		if (error) return callback(error, null);
		signature = data;
	});

	if(!signature) return callback("Error getting labels: No signature provided");

	queryOptions.headers.Authorization = signature;

	return makeRequest(queryOptions, callback);

}
