const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle("AthBot Help Menu")
      .setDescription("These are the available commands for AthBot")
      .setColor("RANDOM")
      .addField("**Music**");
    commands
      .filter((cmd) => cmd.category == "Music")
      .forEach((cmd) => {
        helpEmbed.addField(
          `\`${message.client.prefix}${cmd.name} ${
            cmd.aliases ? `(${cmd.aliases})` : ""
          }\``,
          true
        );
      })

      .addField("**Text**");
    commands
      .filter((cmd) => cmd.category == "Text")
      .forEach((cmd) => {
        helpEmbed.addField(
          `\`${message.client.prefix}${cmd.name} ${
            cmd.aliases ? `(${cmd.aliases})` : ""
          }\``,
          true
        );
      });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  },
};
