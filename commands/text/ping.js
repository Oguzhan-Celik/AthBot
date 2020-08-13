module.exports = {
	name: 'ping',
	description: 'Pong!',
	category: "info",
	cooldown: 5,
	async execute(message, client) {		
		const msg = await message.channel.send(`🏓 Pinging.........`);
		
		msg.edit(`🏓 Pong!!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms`);
	}
};