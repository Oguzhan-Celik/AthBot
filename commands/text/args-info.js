module.exports = {
  name: "args-info",
  category: "Text",
  description: "Information about the arguments provided.",
  args: true,
  execute(message, args) {
    if (args[0] === "foo") {
      return message.channel.send("bar");
    }

    message.channel.send(`First argument: ${args[0]}`);
  },
};
