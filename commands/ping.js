const Discord = require('discord.js');
const Helper = require('helper.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(client, message, args) {
		msg = await message.channel.send('Pinging...');

		msg.edit(new Discord.MessageEmbed()
			.setTitle(':signal_strength: Ping')
			.setDescription(
				`**Latency** ${msg.createdAt - message.createdAt}ms
				**API** ${client.ws.ping}ms
				**Uptime**${Helper.msToTime(client.uptime).slice(0, -4)}`));
	},
};