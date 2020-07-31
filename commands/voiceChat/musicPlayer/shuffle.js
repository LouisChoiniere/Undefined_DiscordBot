module.exports = {
	name: 'shuffle',
	description: 'Shuffle the queue!',
	execute(message, args) {
		var server = servers[message.guild.id];

		if (!server.queue)
			return message.channel.send('Queue is empty!');
		if (!server.queue.length)
			return message.channel.send('Queue is empty!');


		server.queue.sort(() => Math.random() - 0.5);
		message.channel.send('Shuffled the queue!');
	},
};