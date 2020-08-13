const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'say',
	description: `add "embed" to embed version.`,
	execute(message, args) {
	  if (message.deletable) message.delete();

      if (args.length < 1) 
        return message.reply("Nothing to say?").then(m => m.delete({timeout:5000}));

      const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

      if (args[0].toLowerCase() === "embed") {
        const embed = new MessageEmbed()
        .setColor(roleColor)
        .setDescription(args.slice(1).join(" "))
                                    
        message.channel.send(embed);
      } else {
          message.channel.send(args.join(" "));
      }
	},
};