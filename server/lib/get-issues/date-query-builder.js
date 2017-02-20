var _ = require("lodash");

module.exports = function(dateType) {
	return function(p_from, p_to, p_equality) {
		var queryLink = " AND ";

		if(this.firstCall) {
			queryLink = "";
			this.firstCall = false;
		}

		var equality = "";
		if(_.isBoolean(p_equality) && p_equality === false) {
			equality = "-";
		}

		var dateString = queryLink + equality + dateType + ":[" + p_from + " TO " + p_to + "]";

		this.options.queryString = this.options.queryString + dateString;

		return this;
	};
};
