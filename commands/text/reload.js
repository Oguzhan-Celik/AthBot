const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) 
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
			readdirSync(join(__dirname, "..")).forEach(f => {
				const files = readdirSync(join(__dirname, "..", f));
				if (files.includes(`${commandName}.js`)) {
					const file = `../${f}/${commandName}.js`;
		

		try {
			delete require.cache[require.resolve(file)];
			message.client.commands.delete(commandName);
			const pull = require(file);
			message.client.commands.set(commandName, pull);
			return message.channel.send(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			console.log(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	
	}
}
)}
}