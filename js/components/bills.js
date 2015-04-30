import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import BillStore from './../stores/bill.store.js';

module.exports = React.createClass({
	filterBills: function(criteria) {
		var bills = this.state.bills;
		var filtered = _.sortBy(bills, criteria)
		this.setState({'bills': filtered});
	},
	getInitialState: function() {
		return {
			bills: BillStore.getBills()
		}
	},

	render: function() {
		var bills = this.state.bills;
		var billsDom = bills.map((bill, index) => {
			var billPaidDom = bill.paid ? <span className="glyphicon glyphicon-ok" aria-hidden="true" /> : <span></span>
			return (
				<li key={bill.id} className="spacer" onClick={this.toggleBill.bind(this, bill)}>
					<span className="bill-paid">
						{billPaidDom}
					</span>
					<span className="bill-index">{index + 1 + "."}</span>
					<span className="bill-name">{bill.name}</span>
					<span className="bill-amount">{numeral(bill.payment).format('$0,0.00')}</span>
					<span className="bill-due-date">{moment(bill.due_date).format('DD MMM, YYYY')}</span>
				</li>
			)
		})
		return (
			<ul className="list-unstyled">
				{this.renderHeader()}
				{billsDom}
				{this.renderTotalOwed(bills)}
			</ul>
		)
	},

	renderHeader: function() {
		return (
			<li key={"header"} className="spacer total">
				<span className="bill-paid"></span>
				<span className="bill-index"></span>
				<span className="bill-name" onClick={this.filterBills.bind(this, 'name')}>Name</span>
				<span className="bill-amount" onClick={this.filterBills.bind(this, 'payment')}>Amount</span>
				<span className="bill-due-date" onClick={this.filterBills.bind(this, 'due_date')}>Due</span>
			</li>
		)
	},

	renderTotalOwed: function(bills) {
		var totalPayment = bills.reduce((a, b) => {
			return {payment: a.payment + b.payment};
		})
		var totalPayoff = bills.reduce((a, b) => {
			return {total: a.total + b.total};
		})
		return (
			<li key={"total"} className="spacer total">
				<span className="bill-paid"></span>
				<span className="bill-index"></span>
				<span className="bill-name"></span>
				<span className="bill-amount">{numeral(totalPayment.payment).format('$0,0.00')}</span>
				<span className="bill-due-date"></span>
			</li>
		)
	},

	toggleBill: function(bill) {
		var bills = this.state.bills;
		bills.forEach(b => {
			if(b.id === bill.id) {
				b.paid = !b.paid
			}			
		})
		this.setState({'bills': bills});
	}
});
