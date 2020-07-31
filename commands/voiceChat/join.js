module.exports = {
	name: 'join',
	description: 'Join bot to voice channel!',
	async execute(message, args) {
		var server = servers[message.guild.id];

		if (!message.member.voice.channel)
			return message.channel.send('You must be connected to a voice channel to use the bot!');

		server.connection = await message.member.voice.channel.join();
		server.voiceStatus.connected = true;
		// message.channel.send(`joined *${server.connection.channel.name}* !`);
	},
};