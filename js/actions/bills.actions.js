var BillsDispatcher = require('./../dispatchers/bills.dispatcher.js');
var BillsConstant = require('./../constanst/bills.constants.js');

module.exports = {
	getBills() {
		BillsDispatcher.handleViewAction({
			actionType: BillsConstant.GET_BILLS
		});
	}
}