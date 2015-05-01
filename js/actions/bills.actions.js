var BillsDispatcher = require('./../dispatchers/bill.dispatcher.js');
var BillsConstant = require('./../constants/bills.constants.js');

module.exports = {
	addBill(bill) {
		BillsDispatcher.handleViewAction({
			actionType: BillsConstant.ADD_BILL,
			bill: bill
		});
	},

	getBills() {
		BillsDispatcher.handleViewAction({
			actionType: BillsConstant.GET_BILLS
		});
	},
	toggleBill(bill) {
		BillsDispatcher.handleViewAction({
			actionType: BillsConstant.TOGGLE_BILL,
			bill: bill
		});
	}
}