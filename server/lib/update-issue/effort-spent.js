var uuid = require("uuid");

module.exports = function(p_effortObject) {
	var editAction = p_effortObject.editAction || "PUT";
	var effortId = p_effortObject.effortId || uuid.v4();

	var pathEdit = {
		editAction: editAction,
		path: "/extensions/effort/effortSpent/" + effortId
	};

	if (editAction === "PUT") {
		var effortSpent = Object.assign({}, p_effortObject.effortSpent);
		effortSpent.id = effortId;
		pathEdit.data = effortSpent;
	}

	this.options.body.pathEdits.push(pathEdit);

	return this;
};
