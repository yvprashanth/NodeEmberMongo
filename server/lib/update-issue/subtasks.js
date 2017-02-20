module.exports = function(p_subtasksObject) {
	var editAction = p_subtasksObject.editAction || "PUT";

	var pathEdit = {
		editAction: editAction,
		path: "/subtasks/" + p_subtasksObject.issueId
	};

	if (editAction === "PUT") {
		pathEdit.data = {id: p_subtasksObject.issueId};
	}

	this.options.body.pathEdits.push(pathEdit);

	return this;
};
