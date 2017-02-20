var _ = require("lodash");

module.exports = function(p_watchers) {

	var _self = this;

	_self.options.watchers = [];

	if(_.isArray(p_watchers)) {
		_.forEach(p_watchers, function(watcher) {
			_self.options.watchers.push({
				id: watcher,
				type: "email"
			});
		});
	} else {
		_self.options.watchers.push({
			id: p_watchers,
			type: "email"
		});
	}

	return _self;

};
