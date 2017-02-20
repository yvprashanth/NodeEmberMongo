var request = require("request");

module.exports = function(p_options, p_callback) {
	request(p_options, function(error, response, body) {
		if (error) return p_callback(error, null);
		if(!isJsonString(body)) {
			return p_callback({
				error: "RESPONSE IS NOT JSON",
				response: body
			}, null);
		}
        var parsedBody = JSON.parse(body);
	    //console.log(parsedBody);
		return p_callback(null, parsedBody);
	});
};

function isJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
