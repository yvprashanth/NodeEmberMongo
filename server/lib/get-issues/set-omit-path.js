module.exports = function(p_omitPath) {
	if(p_omitPath != null) {
		this.options.omitPath = p_omitPath;
	}
	return this;
};
