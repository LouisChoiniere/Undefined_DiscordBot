const helper = require("helper");

require('helper.js');

module.exports = {
	name: 'pause',
	description: 'Pause player!',
	execute(client, message, args) {
		var server = servers[message.guild.id];

		if (!server.voiceStatus.connected)
			return message.channel.send('Not currently connected to the voice chat');
		if (!server.voiceStatus.playing)
			return message.channel.send('Noting is playing!');
		if (server.dispatcher.paused)
			return message.channel.send('Already paused!');

		server.dispatcher.pause(true);
		message.channel.send(':pause_button: Paused!');
	},
};