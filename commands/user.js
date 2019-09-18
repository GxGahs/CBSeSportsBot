const Discord = require("discord.js");
const auth = require("../auth.json");
const fs = require("fs");
const members = require("../members.json");

module.exports.run = async (bot, message, args) => {

  let gamers = members;
  let person = null;
  let invalid = [];
  if (args[1]) {
    args[1] = args[1].toLowerCase();
  };
  let gradelevel = {
    9: "Freshman",
    10: "Sophomore",
    11: "Junior",
    12: "Senior"
  }

  if (args.length < 3) {
    return message.author.send("You haven't provided enough information. Please try again." +
      "\n The syntax is: *$user full name $ CBSD email $ grade level*");
  }
  if (!(args[1].includes("@cbsd.org") || args[1].includes("@student.cbsd.org"))) {
    invalid.push("email")
  }
  if (parseInt(args[2]) == NaN || args[2] < 9 || args[2] > 12) {
    invalid.push("grade");
  }

  if (invalid.length > 0) {
    return message.author.send("You've provided invalid information in the following" +
      "areas: " + invalid +".\nThe syntax is: *$user full name $ CBSD email $ grade level*");
  }

  for (let i = 0; i < gamers.length; i++) {
    if (gamers[i].id == message.author.id) {
      gamers.splice(i,1);
      break;
    }
  }

  person = {
    id: message.author.id,
    fullname: args[0],
    email: args[1],
    grade: args[2].toString()
  }

  gamers.push(person);

  fs.writeFile("./members.json", JSON.stringify(gamers, null, 2), (err) => {
    if (err) console.log(err)
    });

    if (message.channel.type != "dm") {
      message.guild.channels.find(channel => channel.name == "member-info")
      .send(`**${person.fullname}, ${gradelevel[person.grade]}**\n**email:** ` +
        `${person.email}\n**Discord id:** ${person.id}` +
        "\n------------------------------------");
    }
    else {
      bot.guilds.get(auth.guild).channels.find(channel => channel.name == "member-info")
      .send(`**${person.fullname}, ${gradelevel[person.grade]}**\n**email:** ` +
        `${person.email}\n**Discord id:** ${person.id}` +
        "\n------------------------------------");
    }



  console.log(person + "\n\n" + args);
}

module.exports.help = {
  name: "user",
  aliases: ["u"],
  description: "adds or updates user info",
  usage: `${auth.prefix}user full name ${auth.prefix} email ${auth.prefix} grade`,
  dm: true
}
