var React = require('react');

module.exports = React.createClass({
	handleClick: function() {
		console.log('clicked');
	},
	render: function() {
		return (
			<div>
				<h2>Add Bills</h2>
				<button onClick={this.handleClick}>Add</button>
				<input />
				<input />	
			</div>
		)
	}
});
