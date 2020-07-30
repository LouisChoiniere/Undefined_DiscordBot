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

	// check prefix and not from bot
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	// Split the arguments and command name
	const args = message.content.slice(process.env.PREFIX.length).trim().split(' ');
	const commandName = args.shift().toLowerCase();

	// creates the guild variables
	if (!servers[message.guild.id])
		servers[message.guild.id] = {
			voiceStatus: {},
		};

	// find command
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args.length != args.length) {
		let reply = `You didn't provide any arguments!\nThe proper usage would be: \`${process.env.PREFIX}${command.name} ${command.args.map(function (element) {
			return element;
		}).join("")}\``;

		return message.reply(reply);
	}

	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// ------------------------- CLIENT LOGIN -------------------------
client.login(process.env.TOKEN);