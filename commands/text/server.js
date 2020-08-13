const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'server',
	category: "info",
	description: 'Display info about this server.',
	execute(message) {

		function checkDays(date) {
			let now = new Date();
			let diff = now.getTime() - date.getTime();
			let days = Math.floor(diff / 86400000);
			return days + (days == 1 ? " day" : " days") + " ago";
		};
		let region = {"brazil": ":flag_br: Brazil",
		"eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
	const embed = new MessageEmbed()

	.setColor("RANDOM")
	.setAuthor(`AthBot in ${message.guild.name}`, message.guild.iconURL())
	.setTitle("Info and help")
		.addField("Prefix:", `\`${message.client.prefix}\``, true)
		.addField("Commands help:", `\`${message.client.prefix}help (h)\``, true)
		.addField("Server ID:", message.guild.id, true)
		.addField("Member Count:", message.guild.memberCount, true)
		.addField("Bot Count:", message.guild.members.cache.filter(member => member.user.bot).size, true)
		.addField("Online member:", `${message.guild.memberCount}/${message.guild.members.cache.filter(member => member.presence.status === 'online').size}`, true)
		.addField("Server name:", message.guild.name, true)
		.addField("Server owner:", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
		.addField("Server region:", region[message.guild.region], true)
		.addField("Server Creation Date:", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`)
		

    message.channel.send({embed});


	},
};