import BILL from './../constants/bill.type.js';
import BillsConstants from './../constants/bills.constants.js';
import BillsDispatcher from './../dispatchers/bill.dispatcher.js';
import billUtils from './../utils/bills.utils.js';
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = "change";


var bills = [
	{
		id: 1,
		name: 'Car Payment',
		payment: 56,
		paid: false,
		total: 2200,
		due_date: '2015-05-19T08:27:05-06:00',
		type: BILL.LOAN

	},
	{
		id: 2,
		name: 'Guild Mortgage',
		payment: 1955,
		paid: false,
		total: 305000,
		due_date: '2015-04-01T08:27:05-06:00',
		type: BILL.LOAN
	},
	{
		id: 3,
		name: 'Bank of America MC',
		payment: 123,
		paid: false,
		total: 655,
		due_date: '2015-05-15T08:27:05-06:00',
		type: BILL.CC
	}
];

function _nextId() {
	var result = bills.reduce((a, b) => {
		return {id: a.id > b.id ? a.id : b.id};
	}, {id: 0})
	return result.id + 1;
}

function _addBill(bill) {
	bill.id = _nextId();
	bill.paid = false;
	bill.type = BILL.OTHER
	bills.push(bill);
}

function _toggleBill(bill) {
	bills.forEach(b => {
		if(b.id === bill.id) {
			bill.paid = !bill.paid			
		}
	})
}

var BillStore = _.extend(EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getBills: function() {
		return bills;
	},

	getTotals: function() {
		return {
			owed: billUtils.getTotalOwed(bills),
			paid: billUtils.getTotalPaid(bills)
		}
	},

	dispatcherIndex: BillsDispatcher.register(payload => {
		var action = payload.action;
		switch(action.actionType) {
			case BillsConstants.GET_BILLS:
				break;
			case BillsConstants.TOGGLE_BILL:
				_toggleBill(action.bill);
				break;
			case BillsConstants.ADD_BILL:
				_addBill(action.bill)
				break;
		}

		BillStore.emitChange();

		return true;
	})
})

module.exports = BillStore;