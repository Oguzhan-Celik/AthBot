const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  category: "Text",
  description: "Display all commands and descriptions",
  async execute(message, [command]) {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `${message.guild.name} Help Menu`,
        message.guild.iconURL({ dynamic: true })
      )
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    if (command) {
      const cmd =
        this.client.commands.get(command) ||
        this.client.commands.get(this.client.aliases.get(command));

      if (!cmd)
        return message.channel.send(`Invalid Command named. \`${command}\``);

      embed.setAuthor(
        `${this.client.utils.capitalise(cmd.name)} Command Help`,
        this.client.user.displayAvatarURL()
      );
      embed.setDescription([
        `**❯ Aliases:** ${
          cmd.aliases.length
            ? cmd.aliases.map((alias) => `\`${alias}\``).join(" ")
            : "No Aliases"
        }`,
        `**❯ Description:** ${cmd.description}`,
        `**❯ Category:** ${cmd.category}`,
        `**❯ Usage:** ${cmd.usage}`,
      ]);

      return message.channel.send(embed);
    } else {
      embed.setDescription([
        `These are the available commands for ${message.guild.name}`,
        `The bot's prefix is: ${message.client.prefix}`,
        `Command Parameters: \`<>\` is strict & \`[]\` is optional`,
      ]);
      let categories;
      categories = this.client.commands.map((cmd) => cmd.category);

      for (const category of categories) {
        embed.addField(
          `**${this.client.utils.capitalise(category)}**`,
          this.client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``)
            .join(" ")
        );
      }
      return message.channel.send(embed);
    }
  },
};
