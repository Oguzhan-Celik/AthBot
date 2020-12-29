module.exports = {
  canModifyQueue(member) {
    const { channel } = member.voice;
    const botChannel = member.guild.me.voice.channel;

    if (channel !== botChannel) {
      member
        .send("You need to join the voice channel first!")
        .catch(console.error);
      return false;
    }

    return true;
  },

  removeDuplicates(arr) {
    return [...new Set(arr)];
  },

  capitalise(string) {
    return string
      .split(" ")
      .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
      .join(" ");
  },
};
