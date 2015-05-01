var Button = require('react-bootstrap').Button
import React from 'react';
import BillAction from './../actions/bills.actions.js';

var AddModal = React.createClass({
	handleClick() {
		BillAction.addBill({
			name: this.refs.name.getDOMNode().value,
			payment: parseFloat(this.refs.payment.getDOMNode().value),
			total: parseFloat(this.refs.payoff.getDOMNode().value),
			due_date: this.refs.dueDate.getDOMNode().value
		});
		this.props.close();
	},
	render() {
		return (
			<form className="form-horizontal">
			  <div className="form-group">
			    <label className="col-sm-2 control-label">Bill Name</label>
			    <div className="col-sm-10">
			      <input ref="name" type="text" className="form-control" placeholder="Bill Name" />
			    </div>
			  </div>
			  <div className="form-group">
			    <label className="col-sm-2 control-label">Payment</label>
			    <div className="col-sm-10">
			      <input ref="payment" type="number" className="form-control" placeholder="Payment" />
			    </div>
			  </div>
			  <div className="form-group">
			    <label className="col-sm-2 control-label">Payoff</label>
			    <div className="col-sm-10">
			      <input ref="payoff" type="number" className="form-control" placeholder="Payoff" />
			    </div>
			  </div>
			  <div className="form-group">
			    <label className="col-sm-2 control-label">Due Date</label>
			    <div className="col-sm-10">
			      <input ref="dueDate" type="date" className="form-control" placeholder="Due Date" />
			    </div>
			  </div>
			  <div className="form-group">
			    <div className="col-sm-offset-2 col-sm-10">
			      <Button type="submit" className="btn btn-default" onClick={this.handleClick}>Add Bill</Button>
			    </div>
			  </div>
			</form>
		)
	}
});


module.exports = AddModal;