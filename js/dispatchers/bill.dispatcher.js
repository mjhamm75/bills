var Dispatcher = require('flux').Dispatcher;
var BillsDispatcher = new Dispatcher();

BillsDispatcher.handleViewAction = function(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	};

module.exports = BillsDispatcher;
