import BILL from './../constants/bill.type.js';
import BillsDispatcher from './../dispatchers/bill.dispatcher.js';
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var bills = [
	{
		id: 1,
		name: 'Car Payment',
		payment: 56,
		paid: true,
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

	dispatcherIndex: BillsDispatcher.register(payload => {
		var action = payload.action;
		switch(action.actionType) {
			case BillsConstants.GET_BILLS:
				break;
		}

		BillStore.emitChange();

		return true;
	})
})

module.exports = BillStore;