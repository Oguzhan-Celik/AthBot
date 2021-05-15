const { MessageEmbed } = require('discord.js')
const moment = require('moment')

const filterLevels = {
  DISABLED: 'Off',
  MEMBERS_WITHOUT_ROLES: 'No Role',
  ALL_MEMBERS: 'Everyone',
}

const verificationLevels = {
  NONE: 'None',
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: '(╯°□°）╯︵ ┻━┻',
  VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
}

const regions = {
  brazil: ':flag_br: Brazil',
  'eu-central': ':flag_eu: Central Europe',
  singapore: ':flag_sg: Singapore',
  'us-central': ':flag_us: U.S. Central',
  sydney: ':flag_au: Sydney',
  'us-east': ':flag_us: U.S. East',
  'us-south': ':flag_us: U.S. South',
  'us-west': ':flag_us: U.S. West',
  'eu-west': ':flag_eu: Western Europe',
  'vip-us-east': ':flag_us: VIP U.S. East',
  london: ':flag_gb: London',
  amsterdam: ':flag_nl: Amsterdam',
  hongkong: ':flag_hk: Hong Kong',
  russia: ':flag_ru: Russia',
  southafrica: ':flag_za:  South Africa',
}

module.exports = {
  name: 'server',
  category: 'Text',
  description: 'Display info about this server.',
  async execute(message) {
    const roles = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
    const members = message.guild.members.cache
    const channels = message.guild.channels.cache
    const emojis = message.guild.emojis.cache

    const embed = new MessageEmbed()
      .setDescription(`**Guild information for __${message.guild.name}__**`)
      .setColor('RANDOM')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField('General', [
        `**❯ Name:** ${message.guild.name}`,
        `**❯ ID:** ${message.guild.id}`,
        `**❯ Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
        `**❯ Region:** ${regions[message.guild.region]}`,
        `**❯ Boost Tier:** ${
          message.guild.premiumTier
            ? `Tier ${message.guild.premiumTier}`
            : 'None'
        }`,
        `**❯ Explicit Filter:** ${
          filterLevels[message.guild.explicitContentFilter]
        }`,
        `**❯ Verification Level:** ${
          verificationLevels[message.guild.verificationLevel]
        }`,
        `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format(
          'LT'
        )} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(
          message.guild.createdTimestamp
        ).fromNow()}`,
        '\u200b',
      ])
      .addField('Statistics', [
        `**❯ Role Count:** ${roles.length}`,
        `**❯ Emoji Count:** ${emojis.size}`,
        `**❯ Regular Emoji Count:** ${
          emojis.filter((emoji) => !emoji.animated).size
        }`,
        `**❯ Animated Emoji Count:** ${
          emojis.filter((emoji) => emoji.animated).size
        }`,
        `**❯ Member Count:** ${message.guild.memberCount}`,
        `**❯ Humans:** ${members.filter((member) => !member.user.bot).size}`,
        `**❯ Bots:** ${members.filter((member) => member.user.bot).size}`,
        `**❯ Text Channels:** ${
          channels.filter((channel) => channel.type === 'text').size
        }`,
        `**❯ Voice Channels:** ${
          channels.filter((channel) => channel.type === 'voice').size
        }`,
        `**❯ Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
        '\u200b',
      ])
      .addField('Presence', [
        `**❯ Online:** ${
          members.filter((member) => member.user.presence.status === 'online')
            .size
        }`,
        `**❯ Idle:** ${
          members.filter((member) => member.user.presence.status === 'idle')
            .size
        }`,
        `**❯ Do Not Disturb:** ${
          members.filter((member) => member.user.presence.status === 'dnd').size
        }`,
        `**❯ Offline:** ${
          members.filter((member) => member.user.presence.status === 'offline')
            .size
        }`,
        '\u200b',
      ])

      .setTimestamp()
    message.channel.send(embed)
  },
}
