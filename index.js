require('dotenv').config();
const glob = require('glob')
const Discord = require('discord.js');

const client = new Discord.Client()
client.commands = new Discord.Collection();

glob("./commands/**/*.js", function (err, files) {
	if (err) {
		console.log(err);
	} else {
		for (const file of files) {
			const command = require(file);
			client.commands.set(command.name, command);
		}
	}
});


global.servers = {};

// ------------------------- CLIENT READY -------------------------
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// ------------------------- CLIENT MESSAGE -------------------------
client.on('message', async message => {
	if (message.content == 'beep') {
		client.commands.get('beep').execute(client, message);
		return;
	}

	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (!servers[message.guild.id])
		servers[message.guild.id] = {
			voiceStatus: {},
		};

	try {
		if (typeof client.commands.get(command) !== 'undefined')
			client.commands.get(command).execute(client, message, args);
	} catch (error) {
		// console.log(error);
		// message.channel.send(`There was an error trying to execute \`${process.env.PREFIX}${command}\``);
	}
});

// ------------------------- CLIENT LOGIN -------------------------
client.login(process.env.TOKEN);