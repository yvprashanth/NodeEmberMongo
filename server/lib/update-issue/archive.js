module.exports = function(p_archiveBoolean) {
	p_archiveBoolean = p_archiveBoolean || true;
	this.options.body.pathEdits.push({
		data: p_archiveBoolean,
		editAction: "PUT",
		path: "/deleted"
	});
	return this;
};
