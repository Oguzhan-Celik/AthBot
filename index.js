require('dotenv').config();
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const { prefix } = require('./config.json');

const client = new Client({ disableMentions: "everyone" });

client.login(process.env.token);
client.commands = new Collection();
client.prefix = prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});


client.on("ready", () => {
    console.log(`I am now online, my name is ${client.user.username}`);

    client.user.setActivity("Selam olum he '.help'",
    {type:"PLAYING"});

});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);


client.on("message", async message =>{

    if (message.author.bot) return;
    if (!message.guild) return;
	
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;
	
	const [, matchedPrefix] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 1) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try {
	     await command.execute(message, args, client);
    } catch (error) {
	     console.error(error);
	     message.reply('there was an error trying to execute that command!');
    }
  
});