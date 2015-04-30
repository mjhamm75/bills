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
		var totalPayment = bills.reduce((a, b) => {
			return {payment: a.payment + b.payment};
		});
		var totalPayoff = bills.reduce((a, b) => {
			return {total: a.total + b.total};
		});
		var billsDom = bills.map((bill, index) => {
			var billPaidDom = bill.paid ? <div className="glyphicon glyphicon-ok" aria-hidden="true" /> : <div></div>
			return (
				<tr key={bill.id} className="spacer" onClick={this.toggleBill.bind(this, bill)}>
					<td>
						{billPaidDom}
					</td>
					<td>{index + 1 + "."}</td>
					<td>{bill.name}</td>
					<td>{numeral(bill.payment).format('$0,0.00')}</td>
					<td>{moment(bill.due_date).format('DD MMM, YYYY')}</td>
				</tr>
			)
		})
		return (
			<table className="table table-hover table-condensed bills-table">
				<thead>
					<tr key={"header"}>
						<th></th>
						<th></th>
						<th onClick={this.filterBills.bind(this, 'name')}>Name</th>
						<th onClick={this.filterBills.bind(this, 'payment')}>Amount</th>
						<th onClick={this.filterBills.bind(this, 'due_date')}>Due</th>
					</tr>
				</thead>
				<tbody>
					{billsDom}
					<tr key={"total"}>
						<td></td>
						<td></td>
						<td></td>
						<td>{numeral(totalPayment.payment).format('$0,0.00')}</td>
						<td></td>
					</tr>
				</tbody>
									
			</table>
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
