module.exports = {
	voice: {
		
	},
	msToTime: function (t) {
		var ms = t % 1000;
		t = (t - ms) / 1000;
		var secs = t % 60;
		t = (t - secs) / 60;
		var mins = t % 60;
		var hrs = (t - mins) / 60;

		return hrs + ':' + mins + ':' + secs + '.' + ms;
	}
}