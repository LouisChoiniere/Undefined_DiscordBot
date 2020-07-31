var appRoot = require('app-root-path');
require('dotenv').config();
const ytdl = require('ytdl-core');
const queue = require('./queue');
const youtube = require(appRoot + '/youtube.js')

module.exports = {
	name: 'play',
	aliases: ['p'],
	args: ['videoURL'],
	description: 'Play youtube video!',
	async execute(message, args) {
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
		server.queue = server.queue.concat(await youtube(args[0], ['title', 'url']).then(res => {
			message.channel.send(`:musical_note: Added ${res.length > 1 ? `${res.length} song` : 'song'} to queue`);
			return res;
		}));

		if (!server.voiceStatus.playing) {
			play(message);
		}
	}
};

function play(message) {
	var server = servers[message.guild.id];

	try {
		server.dispatcher = server.connection.play(ytdl(server.queue[0].url, { filter: "audioonly" }));

		server.dispatcher.on('start', () => {
			server.voiceStatus.playing = true;
			message.channel.send(`:musical_note: Now playing: *${server.queue[0].title}*`);
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
	} catch (error) {
		message.channel.send(`An error occured while trying to play this song!`);
		console.error(error)
	}
}