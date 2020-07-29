module.exports = {
	name: 'queue',
	description: 'Look a the queue!',
	execute(client, message, args) {
		var server = servers[message.guild.id];

		if (!server.queue)
			message.channel.send('Queue is empty!');
		else if (!server.queue.length)
			message.channel.send('Queue is empty!');
		else {
			var str = "Queue:\`\`\`md\n";
			server.queue.forEach(function (element, index) {
				str += `[${index}](${element})\n`
			});
			str += `\`\`\``
			message.channel.send(str);
		}
	},
};