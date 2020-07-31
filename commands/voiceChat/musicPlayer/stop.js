module.exports = {
	name: 'stop',
	description: 'Stop music player!',
	execute(message, args) {
		var server = servers[message.guild.id];

		if (!server.voiceStatus.connected)
			return message.channel.send('Not currently connected to the voice chat');
		if (!server.voiceStatus.playing)
			return message.channel.send('Noting is playing!');

		server.voiceStatus.playing = false;

		server.dispatcher.destroy();
		message.channel.send(':stop_button: Stoped playback and emptied queue!');

		// check and empty queue
		if (server.queue)
			server.queue.splice(0, server.queue.length)
	},
};