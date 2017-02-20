module.exports = function(p_newTitle) {
	this.options.body.pathEdits.push({
		data: p_newTitle,
		editAction: "PUT",
		path: "/title"
	});
	return this;
};
