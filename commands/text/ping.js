module.exports = {
  name: "ping",
  category: "Text",
  description: "Pong!",
  cooldown: 5,
  async execute(message, client) {
    const msg = await message.channel.send(`🏓 Pinging.........`);

    msg.edit(
      `🏓 Pong!!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms`
    );
  },
};
