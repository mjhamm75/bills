import React from "react";
import Router from "react-router";
import BillStore from './../stores/bill.store.js';
import numeral from 'numeral';

var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

function getTotals() {
	return BillStore.getTotals();
}

var App = React.createClass({
	componentWillMount: function() {
		BillStore.addChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({totals: getTotals()});
	},

	getInitialState: function() {
		return {
			totals: getTotals()
		}
	},
	render: function () {
		var totals = this.state.totals;
	    return (
			<div>
				<div className="col-md-8">
					<RouteHandler/>
				</div>
				<div className="col-md-4">
					<dl className="dl-horizontal">
						<dt><span className="label label-primary">Owed</span></dt>
						<dd>{numeral(totals.owed).format('$0,0.00')}</dd>
						<dt><span className="label label-success">Paid</span></dt>
						<dd>{numeral(totals.paid).format('$0,0.00')}</dd>
						<dt><span className="label label-warning">Remaining</span></dt>
						<dd>{numeral(totals.owed - totals.paid).format('$0,0.00')}</dd>
					</dl>
				</div>
			</div>
		);
	}
});

module.exports = App;