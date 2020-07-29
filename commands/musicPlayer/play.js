const ytdl = require('ytdl-core');
const axios = require('axios');

module.exports = {
	name: 'play',
	description: 'Play youtube video!',
	async execute(client, message, args) {
		var server = servers[message.guild.id];

		if (!args[0])
			return message.channel.send('You need to include a link to play a song!');

		// join to vc and check if connected
		await client.commands.get('join').execute(client, message, args);
		if (!server.voiceStatus.connected)
			return;

		// create queue for server if doesn't exist
		if (!server.queue)
			server.queue = new Array();

		// add to queue

		await console.log(axios({
			method: 'get',
			url: 'https://www.googleapis.com/youtube/v3/videos',
			params: {
				part: 'snippet',
				id: videoId,
				key: apiKey
			}
		})
			.then(function (response) {
				// handle success
				return response.data.items[0].snippet.localized.title;
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			}));

		server.queue.push(args[0]);
		// server.queue.push({
		// 	name: 
		// 	url: args[0]});
		message.channel.send(`:musical_note: Added *${'song'}* to queue`);


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
		message.channel.send(`:musical_note: Now playing: *${'song'}*`);
	});

	server.dispatcher.on('finish', () => {
		server.queue.shift();
		if (server.queue[0]) {
			play(message);
		} else {
			server.voiceStatus.playing = false;
			message.channel.send('Done playing queue!');
		}
	});

	server.dispatcher.on('error', console.error);
}