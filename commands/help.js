module.exports = {
	name: 'help',
	args: ['commandName'],
	description: 'gives the usage of a command',
	execute(message, args) {
		const command = message.client.commands.get(args[0])
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

		if (!command)
			return message.channel.send(`Command was not found`);

		let embed = {
			"embed": {
				"title": `Help for ***${command.name}***`,
				"description" : `\`${process.env.PREFIX}${command.name} ${command.args ? command.args.map(e => `${e}`).join('') : ''}\``,
				"fields": [{
					"name": "Description",
					"value": command.description
				}, {
					"name": "Aliases",
					"value": command.aliases ? command.aliases.join(', ') : 'No aliases available'
				}]
			}
		};

		message.channel.send(embed);
	},
};