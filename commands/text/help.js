const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message, args) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setAuthor(
        `${message.guild.name} Help Menu`,
        message.guild.iconURL({ dynamic: true })
      )
      .setThumbnail("https://i.imgur.com/HtCrD3H.jpg?1")
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("ORANGE");

    if (args[0]) {
      const commandName = args.shift().toLowerCase();
      const command =
        client.commands.get(commandName) ||
        client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

      if (!command) return message.channel.send(`Invalid Command named.`);

      helpEmbed.setAuthor(
        `${this.client.utils.capitalise(cmd.name)} Command Help`,
        "https://i.imgur.com/HtCrD3H.jpg?1"
      );
      helpEmbed.setDescription([
        `**❯ Aliases:** ${
          cmd.aliases.length
            ? cmd.aliases.map((alias) => `\`${alias}\``).join(" ")
            : "No Aliases"
        }`,
        `**❯ Description:** ${cmd.description}`,
        `**❯ Category:** ${cmd.category}`,
      ]);
    } else {
      helpEmbed
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
    }

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  },
};
