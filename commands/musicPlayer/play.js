const ytdl = require('ytdl-core')

module.exports = {
	name: 'play',
	description: 'Play youtube video!',
	async execute(client, message, args) {
		var server = servers[message.guild.id];

		if (!args[0])
			throw 'You need to include a link to play a song!';

		// join to vc and check if connected
		await client.commands.get('join').execute(client, message, args);
		if (!server.voiceStatus.connected)
			return;

		// create queue for server if doesn't exist
		if (!server.queue)
			server.queue = new Array();

		// add to queue
		server.queue.push(args[0]);
		message.channel.send(`Added *${'song'}* to queue`);


		if (!server.voiceStatus.playing) {
			play(message);
		}
	}
};

function play(message) {
	var server = servers[message.guild.id];

	try {
		server.dispatcher = server.connection.play(ytdl(server.queue[0], { filter: "audioonly" }));
	} catch {
		message.channel.send(`An error occured while trying to play this song!`);
	}

	server.dispatcher.on('start', () => {
		server.voiceStatus.playing = true;
		message.channel.send(`Now playing: *${'song'}*`);
	});

	server.dispatcher.on('finish', () => {
		if (server.queue[0]) {
			server.queue.shift();
			play(message);
		} else {
			server.voiceStatus.playing = false;
			message.channel.send('Done playing queue!');
		}
	});

	server.dispatcher.on('error', console.error);
}