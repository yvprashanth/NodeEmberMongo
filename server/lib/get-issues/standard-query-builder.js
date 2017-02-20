var _ = require("lodash");

module.exports = function(queryType) {
	return function(p_items, p_equality, p_operation) {
		var queryLink = " AND ";

		if(this.firstCall) {
			queryLink = "";
			this.firstCall = false;
		}

		if(queryType === "extensions.backlog.priority") {
			p_items = processPriority(p_items);
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

function processPriority(p_items) {
	if(_.isString(p_items)) {
		if(p_items.toLowerCase() === "high") {
			p_items = "[0.666 TO 1]";
		}
		if(p_items.toLowerCase() === "medium") {
			p_items = "[0.333 TO 0.666]";
		}
		if(p_items.toLowerCase() === "low") {
			p_items = "[0 TO 0.333]";
		}
	}
	if(_.isArray(p_items)) {
		var itemArray = [];
		_.forEach(p_items, function(item) {
			if(item.toLowerCase() === "high") {
				itemArray.push("[0.666 TO 1]");
			}
			if(item.toLowerCase() === "medium") {
				itemArray.push("[0.333 TO 0.666]");
			}
			if(item.toLowerCase() === "low") {
				itemArray.push("[0 TO 0.333]");
			}
			p_items = itemArray;
		});
	}
	return p_items;
}
