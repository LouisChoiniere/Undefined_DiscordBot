const MessageEmbed = require('discord.js').MessageEmbed;
const Helper = require('helper/helper');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(client, message, args) {
		msg = await message.channel.send('Pinging...');

		msg.edit(new MessageEmbed()
			.setTitle(':signal_strength: Ping')
			.setDescription(
				`**Latency** ${msg.createdAt - message.createdAt}ms\n**API** ${client.ws.ping}ms\n**Uptime**${Helper.msToTime(client.uptime).slice(0, -4)}`));
	},
};