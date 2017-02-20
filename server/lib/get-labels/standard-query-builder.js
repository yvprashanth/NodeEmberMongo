var _ = require("lodash");

module.exports = function(queryType) {
	return function(p_items, p_equality, p_operation) {
		var queryLink = " AND ";

		if(this.firstCall) {
			queryLink = "";
			this.firstCall = false;
		}

		if(_.isArray(p_items)) {
			p_operation = p_operation || "OR";
			p_items = "(" + p_items.join(" " + p_operation + " ") + ")";
		}

		var equality = "";
		if(_.isBoolean(p_equality) && p_equality === false) {
			equality = "-";
		}

		this.options.queryString = this.options.queryString + queryLink + equality + queryType + ":" + p_items;

		return this;
	};
};
