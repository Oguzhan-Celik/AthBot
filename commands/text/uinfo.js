const Discord = require('discord.js')
const Canvas = require('canvas')

module.exports = {
  name: 'infoimg',
  description: 'Display info about user with image',
  aliases: ['uimg'],
  category: 'Text',
  async execute(message, client, args) {
    if (!args < 1) {
      var user = message.author
    } else {
      var user =
        message.mentions.users.first() ||
        message.client.users.cache.get(args < 1)
    }
    var member = message.guild.member(user)

    const canvas = Canvas.createCanvas(500, 200)
    const ctx = canvas.getContext('2d')

    let img = [
      'https://i.pinimg.com/564x/fe/d6/68/fed6681ac4a737171669bf30085ea760.jpg',
      'https://i.pinimg.com/originals/3b/8a/d2/3b8ad2c7b1be2caf24321c852103598a.jpg',
      'https://i.redd.it/6a03f7qd6if51.png',
      'https://cdn.hovia.com/app/uploads/Green-Tropical-Plant-Wallpaper-Mural-Plain-820x532.jpg',
      'https://i4.hurimg.com/i/hurriyet/75/0x0/5f723d507af50732b4b9d379.jpg',
      'https://wallpapercave.com/wp/wp4676576.jpg',
      'https://image.freepik.com/free-vector/landscape-wallpaper-flat-design_74890-37.jpg',
      'https://images.thdstatic.com/productImages/b3831648-d6d7-43e2-8585-a3920a449167/svn/a-street-prints-wallpaper-rolls-2744-24129-64_600.jpg',
      'https://dynamicwallpaper.club/landing-vids/1.png',
    ]

    let pick = img[Math.floor(Math.random() * img.length)]

    const background = await Canvas.loadImage(pick)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#ffffff'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#ffffff'
    var size1 = 40
    var size2 = 30
    var size3 = 30

    var name = `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`
    do {
      ctx.font = `${(size1 -= 5)}px sans-serif`
    } while (ctx.measureText(name).width > canvas.width - 225)
    ctx.fillText(name, 200, 65)

    var created = 'Created: ' + user.createdAt.toUTCString().substr(0, 16)
    do {
      ctx.font = `${(size2 -= 5)}px sans-serif`
    } while (ctx.measureText(created).width > canvas.width - 225)
    ctx.fillText(created, 200, 110)

    var joined = 'Joined: ' + member.joinedAt.toLocaleString()
    do {
      ctx.font = `${(size3 -= 5)}px sans-serif`
    } while (ctx.measureText(joined).width > canvas.width - 225)
    ctx.fillText(joined, 200, 145)

    ctx.beginPath()
    ctx.arc(100, 100, 75, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    const avatar = await Canvas.loadImage(
      user.displayAvatarURL({ format: 'jpg' })
    )
    ctx.drawImage(avatar, 25, 25, 150, 150)

    const final = new Discord.MessageAttachment(
      canvas.toBuffer(),
      'userinfo.png'
    )

    return message.channel.send(final)
  },
}
