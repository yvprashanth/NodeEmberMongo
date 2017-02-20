var _ = require("lodash");
var querystring = require("querystring");
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

	// if p_options is a boolean, then we need to recurse the requests until
	// there are no more start tokens
	if((_.isBoolean(p_options) && p_options === true) || options.recurseRequests === true) {
		options.recurseRequests = false;
		return recurseSimRequest(config, options, null, callback);
	}

	var query = {
		q : options.queryString,
		omitPath : options.omitPath != null ? options.omitPath : "conversation",
		sort: options.sort ? options.sort : "lastUpdatedConversationDate",
		startToken : options.startToken || ""
	};

	var url = config.endpoint + "issues";
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

	if(!signature) return callback("Error getting issues: No signature provided");

	queryOptions.headers.Authorization = signature;

	return makeRequest(queryOptions, callback);

}

function recurseSimRequest(p_config, p_options, p_issues, p_callback) {
	if(p_issues == null) {
		p_issues = {
			documents : []
		};
	}
	exec(p_config, p_options, function(error, data) {
		if (error) return p_callback(error, null);
		if (data.startToken && data.startToken !== "") {
			p_options.startToken = data.startToken;
			p_issues.documents = p_issues.documents.concat(data.documents);
			recurseSimRequest(p_config, p_options, p_issues, p_callback);
		} else {
			p_issues.documents = p_issues.documents.concat(data.documents);
			return p_callback(null, p_issues);
		}
	});
}
