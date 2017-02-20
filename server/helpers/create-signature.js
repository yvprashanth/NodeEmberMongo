var sign = require("./signer");

module.exports = function(p_url, p_options, p_callback) {
	var signingData = {
		url: p_url,
		key: p_options.config.keys.access,
		secret: p_options.config.keys.secret,
		region: p_options.config.region,
		method: p_options.method,
		service: "sim",
		version: "20120812",
		payload: p_options.body,
		headers: p_options.headers
	};
	sign(signingData, p_callback);
};
