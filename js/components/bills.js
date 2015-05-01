import _ from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import React from 'react';

import BillActions from './../actions/bills.actions.js'
import BillStore from './../stores/bill.store.js';
import AddBill from './add.js';


function getBills() {
	return BillStore.getBills();
}

module.exports = React.createClass({
	componentWillMount: function() {
		BillStore.addChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({bills: getBills()});
	},

	filterBills: function(criteria) {
		var bills = this.state.bills;
		var filtered = _.sortBy(bills, criteria)
		this.setState({'bills': filtered});
	},

	getInitialState: function() {
		return {
			bills: getBills()
		}
	},

	render: function() {
		var bills = this.state.bills;
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
			<div>
				<AddBill />
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
					</tbody>			
				</table>
			</div>
		)
	},

	toggleBill: function(bill) {
		BillActions.toggleBill(bill);
	}
});
