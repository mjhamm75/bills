var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var React = require('react');

import AddModal from './add.modal.js';

module.exports = React.createClass({
	mixins: [OverlayMixin],

	getInitialState() {
		return {
			isModalOpen: false
		};
	},

	handleToggle() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	},

	render: function() {
		return (
			<div>
				<Button bsStyle="primary" onClick={this.handleToggle}>
					Add
				</Button>
			</div>
		)
	},

	renderOverlay() {
		if (!this.state.isModalOpen) {
			return <span/>;
		}

		return (
			<Modal bsStyle='primary' title='Add bill' animation={false} onRequestHide={this.handleToggle}>
				<div className='modal-body'>
					<AddModal close={this.handleToggle}/>
				</div>
				<div className='modal-footer'>
					<Button onClick={this.handleToggle}>Close</Button>
				</div>
			</Modal>
		);
  }
});
