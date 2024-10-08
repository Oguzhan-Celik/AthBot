const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'love',
  description: 'love meter',
  category: 'Text',
  cooldown: 5,
  async execute(message, args) {
    var user = message.client.users.cache.get(args < 1)

    const love = Math.random() * 100
    const loveIndex = Math.floor(love / 10)
    const loveLevel = '❤'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex)

    const embed = new MessageEmbed()
    embed.setColor('#FF283F')

    if (message.mentions.users.size > 0 && !args[1]) {
      let user = message.mentions.users.first()
      embed.setTitle(`${message.author.username} love ${user.username}!`)
    } else if (message.mentions.users.size > 0 && args[1]) {
      let user = message.mentions.users.first()
      embed.setTitle(`${user.username} love ${args[1]}`)
    } else if (message.mentions.users.size > 1) {
      let user = message.mentions.users.first()
      let user2 = message.mentions.users.second()
      embed.setTitle(`${user.username} love ${user2.username}`)
    } else if (args[0]) {
      embed.setTitle(`${message.author.username} love ${args[0]}`)
    } else {
      embed.setTitle(`${message.author.username} love himself`)
    }

    embed.addField(`${loveLevel}`, '\u200b')
    embed.setTimestamp()
    message.channel.send(embed)
  },
}
