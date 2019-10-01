const Discord = require("discord.js");
const auth = require("../auth.json");
const fs = require("fs");
const members = require("../members.json");

module.exports.run = async (bot, message, args) => {

  console.log(message.author);


}

module.exports.help = {
  name: "test",
  aliases: ["t"],
  description: "test function",
  dm: false
}
