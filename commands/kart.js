const Discord = require("discord.js");
const auth = require("../auth.json");
const fs = require("fs");
const members = require("../members.json");
const commonlib = require('/CBS eSports bot/libraries/commonlib.json');

module.exports.run = async (bot, message, args) => {

  if (args.length < 1) {
    return message.channel.send("Invalid arguments.");
  }

  type = args[0].toLowerCase();

  if (!(type == "track" || type == "tracks" ||
        type == "cup" || type == "cups")) {
          return message.channel.send("Invalid arguments.");
  }

  let tracklist = commonlib.MKDD_track_list;
  let cuplist = commonlib.MKDD_track_list;
  let fillList =[];
  let num = parseInt(args[1]) || 1;
  let lists = {
    "track": tracklist,
    "tracks": tracklist,
    "cup": cuplist,
    "cups": cuplist
  }
  let returnstr = "";

  for (let i = 0; i < num; i++) {
    let random = (Math.random() * lists[type].length);
    fillList.push(lists[type].pop(random));
  }

  for (let i = 0; i < fillList.length-1; i++) {
    returnstr += fillList[i] + "\n";
  }
  returnstr += fillList[fillList.length-1];

  message.channel.send(returnstr);


}

module.exports.help = {
  name: "randomkart",
  aliases: ["rk"],
  description: "randomly selects mariokart tracks or cups.",
  usage: `${auth.prefix}randomkart [track:cup] ${auth.prefix} #ofTracks/Cups`,
  dm: false
}
