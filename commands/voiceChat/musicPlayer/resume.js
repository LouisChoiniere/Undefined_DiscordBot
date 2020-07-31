module.exports = {
	name: 'resume',
	aliases: ['unpause'],
	description: 'Resume player!',
	execute(message, args) {
		var server = servers[message.guild.id];

		if (!server.voiceStatus.connected)
			return message.channel.send('Not currently connected to the voice chat');
		if (!server.voiceStatus.playing)
			return message.channel.send('Noting is playing!');
		if (!server.dispatcher.paused)
			return message.channel.send('Player not curently paused!');

		server.dispatcher.resume();
		message.channel.send(':play_pause: Resumed!');
	},
};