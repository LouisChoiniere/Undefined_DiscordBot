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

			var nowPlaying = `${server.queue[0]}`;

			var upNext = ``;
			if(server.queue.length > 1) {
				for (var index = 1; index < server.queue.length; index++) {
					upNext += `[${index}] ${server.queue[index]}\n`;
				}
			} else {
				upNext = `No songs in the queue!`;
			}

			let embed = {
				"embed": {
					"title": ":musical_note: Queue",
					"color": 1343810,
					"fields": [{
						"name": "Now playing",
						"value": nowPlaying
					}, {
						"name": "Up next",
						"value": upNext
					}]
				}
			};

			message.channel.send(embed);
		}
	},
};