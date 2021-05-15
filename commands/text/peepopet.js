const Discord = require('discord.js')
const Canvas = require('canvas')

module.exports = {
  name: 'peepopet',
  description: 'pet pet pet',
  category: 'Text',
  aliases: ['ppet'],
  cooldown: 5,
  async execute(message, args) {
    if (!message.mentions.users.size > 0) {
      var user = message.author
    } else {
      var user =
        message.mentions.users.first() ||
        message.client.users.cache.get(args < 1)
    }

    const canvas = Canvas.createCanvas(300, 300)
    const ctx = canvas.getContext('2d')

    const avatar = await Canvas.loadImage(
      user.displayAvatarURL({ format: 'jpg' })
    )
    ctx.drawImage(avatar, 5, 160, 150, 150)
    ctx.beginPath()
    ctx.arc(80, 240, 75, 0, Math.PI * 2, true)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
    ctx.save()
    ctx.clip()

    ctx.restore()

    var myGif = GIF()
    myGif.load(
      'https://cdn.betterttv.net/emote/5f21db8fcf6d2144653d8bd4/3x.gif'
    )

    ctx.drawImage(myGif.image, 0, 0)

    const final = new Discord.MessageAttachment(canvas.toBuffer(), 'pet.gif')

    return message.channel.send(final)
  },
}
