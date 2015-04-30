module.exports = {
	getTotalOwed: function(bills) {
		return bills.reduce((a, b) => {
			return {payment: a.payment + b.payment}
		}, {payment: 0}).payment;
	},
	getTotalPaid: function(bills) {
		var billsPaid = bills.filter(bill => {
			return bill.paid;
		})
		var totalPaid = billsPaid.reduce((a, b) => {
			return {payment: a.payment + b.payment}
		}, {payment: 0});
		return totalPaid.payment;
	}
}