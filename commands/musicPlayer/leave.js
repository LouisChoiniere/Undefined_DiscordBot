module.exports = {
	name: 'leave',
	description: 'Leave voice chanel!',
	execute(client, message, args) {
		var server = servers[message.guild.id];

		try {
			if (!server.voiceStatus.connected)
				throw 'Not currently connected to the voice chat';

			server.voiceStatus.connected = false;

			server.connection.disconnect();
			message.channel.send('Bye :wave:');

			// check and empty queue
			if (server.queue)
				server.queue.splice(0, server.queue.length)
		} catch (error) {
			console.log(error)
			message.channel.send(error);
		}
	},
};