const Discord = require('discord.js')

module.exports = {
  name: 'hug',
  description: 'share your love my friend;)',
  category: 'Text',
  cooldown: 5,
  execute(message) {
    let gifs = [
      'https://cdn.myanimelist.net/s/common/uploaded_files/1460988091-6e86cd666a30fcc1128c585c82a20cdd.gif',
      'https://acegif.com/wp-content/gif/anime-hug-19.gif',
      'https://acegif.com/wp-content/gif/anime-hug-14.gif',
      'https://acegif.com/wp-content/gif/anime-hug-27.gif',
      'https://media.giphy.com/media/EvYHHSntaIl5m/giphy.gif',
      'https://media.giphy.com/media/fyx8vjZc2ZvoY/giphy.gif',
    ]
    let pick = gifs[Math.floor(Math.random() * gifs.length)]

    const embed = new Discord.MessageEmbed()
    embed.setColor('RANDOM')
    embed.setImage(pick)

    if (message.mentions.users.size > 0) {
      let user = message.mentions.users.first()
      embed.setTitle(`${message.author.username} hugs ${user.username}!`)
    } else {
      embed.setTitle(`${message.author.username} wants a hug.`)
    }

    message.channel.send({ embed })
  },
}
