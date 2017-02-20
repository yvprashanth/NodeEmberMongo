module.exports = function(p_impact) {
	this.options.extensions = this.options.extensions || {};
	this.options.extensions.tt = this.options.extensions.tt || {};
	this.options.extensions.tt.impact = p_impact;
	return this;
};
