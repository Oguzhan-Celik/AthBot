const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "peepohug",
  description: "sum hug?",
  category: "Text",
  aliases: ["phug"],
  cooldown: 5,
  async execute(message, args) {
    if (!message.mentions.users.size > 0) {
      var user = message.author;
    } else {
      var user =
        message.mentions.users.first() ||
        message.client.users.cache.get(args < 1);
    }

    const canvas = Canvas.createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(
      "https://i.postimg.cc/Bt9MgcxW/hug-body2.png"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(80, 240, 75, 0, Math.PI * 2, true);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 5, 160, 150, 150);

    ctx.restore();
    const background2 = await Canvas.loadImage(
      "https://i.postimg.cc/zBhXrR7p/hug-el.png"
    );
    ctx.drawImage(background2, 0, 0, canvas.width, canvas.height);

    const final = new Discord.MessageAttachment(canvas.toBuffer(), "hug.png");

    return message.channel.send(final);
  },
};
