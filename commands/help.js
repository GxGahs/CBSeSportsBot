const Discord = require("discord.js");
const auth = require("../auth.json");
const fs = require("fs");
const members = require("../members.json");

module.exports.run = async (bot, message, args) => {

  if (args.length == 1 && args[0] == "") {
    return message.channel.send("use the help command like this:\n" +
      "*" + auth.prefix + "help commandname*");
  }

  let commandfile = bot.commands.get(args[0])
    || bot.commands.find
      (a => (a.help.aliases && a.help.aliases.includes(args[0])));

      console.log(commandfile);

  if (commandfile) {
    return message.channel.send(`** ${args[0]} (${commandfile.help.name}) usage:**\n` +
      `*${commandfile.help.usage}*`);
  }
  else {
      return message.channel.send("That is not a valid command.");
  }


}

module.exports.help = {
  name: "help",
  aliases: [],
  description: "retrieves command data",
  usage: auth.prefix + "help commandname",
  dm: true
}
