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

    if (message.mentions.users.size > 0) {
      let user = message.mentions.users.first()
      embed.setTitle(`${message.author.username} love ${user.username}!`)
    } else {
      embed.setTitle(`${user} love`)
    }

    embed.setTitle(loveLevel)

    message.channel.send(embed)
  },
}
