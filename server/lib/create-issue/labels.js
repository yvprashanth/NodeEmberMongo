var _ = require("lodash");

module.exports = function(p_labels) {

	var _self = this;

	_self.options.labels = [];

	if(_.isArray(p_labels)) {
		_.forEach(p_labels, function(label) {
			_self.options.labels.push({
				id: label
			});
		});
	} else {
		_self.options.labels.push({
			id: p_labels
		});
	}

	return _self;

};
