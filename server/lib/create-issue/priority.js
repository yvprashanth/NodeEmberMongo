module.exports = function(p_priority) {
	this.options.extensions = this.options.extensions || {};
	this.options.extensions.backlog = this.options.extensions.backlog || {};
	this.options.extensions.backlog.priority = p_priority;
	return this;
};
