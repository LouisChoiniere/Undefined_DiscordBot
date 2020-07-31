module.exports = {
	name: 'leave',
	description: 'Leave voice chanel!',
	execute(message, args) {
		var server = servers[message.guild.id];

		if (!server.voiceStatus.connected)
			return message.channel.send('Not currently connected to the voice chat');

		server.voiceStatus.connected = false;
		server.voiceStatus.playing = false;

		server.connection.disconnect();
		message.channel.send('Bye :wave:');

		// check and empty queue
		if (server.queue)
			server.queue.splice(0, server.queue.length)
	},
};