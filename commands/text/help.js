const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Text",
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
        message.client.commands.get(commandName) ||
        message.client.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

      if (!command) return message.channel.send(`Invalid Command named.`);

      helpEmbed.setAuthor(
        `${command.name} Command Help`,
        "https://i.imgur.com/HtCrD3H.jpg?1"
      );
      helpEmbed.setDescription([
        `**❯ Aliases:** ${
          command.aliases ? `(${command.aliases})` : "No Aliases"
        }`,
        `**❯ Description:** ${command.description}`,
        `**❯ Category:** ${command.category}`,
        `**❯ Usage:** ${message.client.prefix}${command.name}`,
      ]);
    } else {
      helpEmbed.setDescription([
        `These are the available commands for ${message.guild.name}`,
        `The bot's prefix is: \`${message.client.prefix}\``,
      ]);
      helpEmbed
        .addField(
          "**Music**",
          commands
            .filter((cmd) => cmd.category == "Music")
            .map(
              (cmd) => `\`${cmd.name}${cmd.aliases ? `(${cmd.aliases})` : ""}\``
            )
            .join(" ")
        )
        .addField(
          "**Text**",
          commands
            .filter((cmd) => cmd.category == "Text")
            .map(
              (cmd) => `\`${cmd.name}${cmd.aliases ? `(${cmd.aliases})` : ""}\``
            )
            .join(" ")
        );
    }

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  },
};
