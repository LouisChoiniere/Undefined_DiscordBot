var appRoot = require('app-root-path');
const MessageEmbed = require('discord.js').MessageEmbed;
const Helper = require(appRoot + '/helper.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(message, args) {
		msg = await message.channel.send('Pinging...');

		msg.edit(new MessageEmbed()
			.setTitle(':signal_strength: Ping')
			.setDescription(
				`**Latency** ${msg.createdAt - message.createdAt}ms\n**API** ${message.client.ws.ping}ms\n**Uptime**${Helper.msToTime(message.client.uptime).slice(0, -4)}`));
	},
};