const ytdl = require('ytdl-core');
module.exports = {
	name: 'diablo',
	description: '🦁',
	category: "info",
	cooldown: 5,
	async execute(message, client) {		
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=KS1oIN6Fq4w', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('finish', () => voiceChannel.leave());
        });
        process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
	}
};