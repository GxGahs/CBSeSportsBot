const Discord = require("discord.js");
const auth = require("../auth.json");
const fs = require("fs");
const members = require("../members.json");

module.exports.run = async (bot, message, args) => {

  const tcount = args[0] || 2;

  message.channel.send(`<@${message.author.id}> is requesting ${tcount}` +
    ` random teams. React to this message to join the queue.`).then()








}

module.exports.help = {
  name: "team",
  aliases: ["teams","t"],
  description: "randomly selects teams from the users who react to the message.",
  usage: `${auth.prefix}team #ofTeams`,
  dm: false
}
