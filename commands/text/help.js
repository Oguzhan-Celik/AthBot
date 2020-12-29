const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor(
        `${message.guild.name} Help Menu`,
        message.guild.iconURL({ dynamic: true })
      )
      .setThumbnail("https://imgur.com/HtCrD3H")
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("ORANGE")
      .addField(
        "**Music**",
        commands
          .filter((cmd) => cmd.category == "Music")
          .map(
            (cmd) =>
              `\`${message.client.prefix}${cmd.name} ${
                cmd.aliases ? `(${cmd.aliases})` : ""
              }\``
          )
          .join(" ")
      )
      .addField(
        "**Text**",
        commands
          .filter((cmd) => cmd.category == "Text")
          .map(
            (cmd) =>
              `\`${message.client.prefix}${cmd.name} ${
                cmd.aliases ? `(${cmd.aliases})` : ""
              }\``
          )
          .join(" ")
      );

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  },
};
