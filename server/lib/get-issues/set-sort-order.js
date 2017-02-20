module.exports = function(p_sort) {
	if(p_sort != null) {
		this.options.sort = p_sort;
	}
	return this;
};
