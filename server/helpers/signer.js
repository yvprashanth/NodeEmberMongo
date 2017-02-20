// Originaly forked from https://code.amazon.com/packages/NodeIssues/blobs/mainline/--/scripts/helpers/signer.js

var crypto = require("crypto");
var urlparser = require("url");

var hmac = function(key, data) {
	var h = crypto.createHmac("SHA256", key);
	h.update(data);
	return new Buffer(h.digest("base64"), "base64");
};

var encodeQueryString = function(qs) {
	if (!qs) return "";
	var keys = Object.keys(qs),
		result = [];
	keys.sort();
	for (var i = 0, l = keys.length; i < l; i++) {
		var tempKey = (encodeURIComponent(keys[i]) + "=" + encodeURIComponent(qs[keys[i]])).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");
		result.push(tempKey);
	}
	return result.join("&");
};

var encodeHeaders = function(headers, url) {
	var keys = Object.keys(headers),
		h = {},
		i = keys.length,
		lCaseKey,
		l;
	while (i--) {
		lCaseKey = keys[i].toLowerCase();
		h[lCaseKey] = headers[keys[i]];
		if (lCaseKey === "date" || lCaseKey === "x-amz-date") h[lCaseKey] = formatDate(headers[keys[i]]);
	}
	h.host = url.hostname;

	var k = Object.keys(h),
		result = [];
	k.sort();
	for (i = 0, l = k.length; i < l; i++) result.push(k[i] + ":" + removeExcessSpace(h[k[i]]));

	return {
		canonical: result.join("\n") + "\n",
		list: k.join(";"),
		headers: h
	};
};

var removeExcessSpace = function(data) {
	return (data.indexOf("\"") === -1) ? data.replace(/\s{2,}/g, " ").trim() : data.trim();
};

var sha256 = function(payload) {
	payload = payload || "";
	var h = crypto.createHash("SHA256");
	h.update(payload);
	return h.digest("hex");
};

// ISO8601 Basic format
var formatDate = function(date) {
	return date.toISOString().replace(/\.[0-9]{1,3}Z/g, "Z").replace(/[\.:-]/g, "");
};

module.exports = function(p_data, p_callback) {
	if (!p_data.url) return p_callback("Error Signing Request: missing attribute url", null);
	if (!p_data.method) return p_callback("Error Signing Request: missing attribute method", null);
	if (!p_data.version) return p_callback("Error Signing Request: missing attribute version", null);
	if (!p_data.key) return p_callback("Error Signing Request: missing attribute key", null);
	if (!p_data.secret) return p_callback("Error Signing Request: missing attribute secret", null);
	if (!p_data.region) return p_callback("Error Signing Request: missing attribute region", null);
	if (!p_data.service) return p_callback("Error Signing Request: missing attribute service", null);
	if (!p_data.payload) return p_callback("Error Signing Request: missing payload(body)", null);
	if (!p_data.headers) return p_callback("Error Signing Request: missing attribute headers", null);
	if (!p_data.headers.date) return p_callback("Error Signing Request: missing attribute headers.date", null);
	if (typeof p_data.headers.date !== "object") return p_callback("Error Signing Request: attribute.headers.date must be typeof date!", null);
	p_data.method = p_data.method.toUpperCase().trim();
	p_data.region = p_data.region.toLowerCase().trim();
	p_data.service = p_data.service.toLowerCase().trim();

	var url = urlparser.parse(p_data.url, true),
		headers = encodeHeaders(p_data.headers, url),
		shortDate = headers.headers.date.substr(0, 8),
		canonicalRequest = [p_data.method, url.pathname, encodeQueryString(p_data.query || url.query), headers.canonical, headers.list, sha256(p_data.payload)],
		requestSignature = sha256(canonicalRequest.join("\n")),
		signString = ["AWS4-HMAC-SHA256", headers.headers.date, shortDate + "/" + p_data.region + "/" + p_data.service + "/aws4_request", requestSignature].join("\n"),
		signature = hmac(hmac(hmac(hmac(hmac("AWS4" + p_data.secret, shortDate), p_data.region.trim()), p_data.service), "aws4_request"), signString).toString("hex");

	p_data.headers.date = headers.headers.date;
	p_data.headers["x-amz-algorithm"] = "AWS4-HMAC-SHA256";

	return p_callback(null, ["AWS4-HMAC-SHA256 Credential=" + p_data.key + "/" + shortDate + "/" + p_data.region + "/" + p_data.service + "/aws4_request", "SignedHeaders=" + headers.list, "Signature=" + signature].join(", "));
};
