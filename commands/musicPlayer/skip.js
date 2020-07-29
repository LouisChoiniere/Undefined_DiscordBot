module.exports = {
	name: 'skip',
	description: 'Skip song!',
	execute(client, message, args) {
		var server = servers[message.guild.id];

		if (!server.voiceStatus.connected)
			return message.channel.send('Not currently connected to the voice chat');
		if (!server.voiceStatus.playing)
			return message.channel.send('Noting is playing!');

		server.dispatcher.end();
		message.channel.send('Skipped song!')
	},
};