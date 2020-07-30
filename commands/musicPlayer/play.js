require('dotenv').config();
const ytdl = require('ytdl-core');
const ytlist = require('youtube-playlist');
const axios = require('axios');
const { exit } = require('process');

module.exports = {
	name: 'play',
	args: ['videoURL'],
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
		server.queue.push({
			name: await
				ytlist(url, 'name').then(res => {
					console.log(res.data);
					return res.data;
				})
			// axios({
			// 	method: 'get',
			// 	url: 'https://www.googleapis.com/youtube/v3/videos',
			// 	params: {
			// 		part: 'snippet',
			// 		id: args[0].match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1],
			// 		key: process.env.googleApiKey
			// 	}
			// }).then(function (response) {
			// 	return response.data.items[0].snippet.localized.title;
			// }),
			// url: args[0]
		});
		message.channel.send(`:musical_note: Added song to queue`);


		if (!server.voiceStatus.playing) {
			play(message);
		}
	}
};

function play(message) {
	var server = servers[message.guild.id];

	try {
		server.dispatcher = server.connection.play(ytdl(server.queue[0].url, { filter: "audioonly" }));
	} catch {
		message.channel.send(`An error occured while trying to play this song!`);
	}

	server.dispatcher.on('start', () => {
		server.voiceStatus.playing = true;
		message.channel.send(`:musical_note: Now playing: *${server.queue[0].name}*`);
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