const auth = require("./auth.json");
const Discord = require("discord.js");
const fs = require("fs");
const members = require("./members.json");

const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

//command handler
fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0){
    console.log("couldn\"t find commands.");
  return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    //console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`Connected, Logged in as: ${bot.user.username}`);

  bot.user.setPresence({
    game: {name: "Go Titans (≧◡≦✿)"}
  });
});

//JOIN SEND MESSAGE
bot.on("guildMemberAdd", (member) => {

  gamers = members;
  memberid = member.user.id;

  for (let i = 0; i < members.length; i++) {
    console.log(memberid + "  " + members[i].id);
    if (members[i].id == memberid) {
      return member.send("you already exist in our directory.");
    }
  }

  gamers.push({
    id: memberid.toString(),
    fullname: "",
    email: "",
    grade: 0
  });

  console.log(gamers)



  fs.writeFile("./members.json", JSON.stringify(gamers, null, 2), (err) => {
    if (err) console.log(err)
    });

  return member.send("Hey Gamer! You're almost all set up; just use the $user function "
   + "in the bot channel to enter your full name, student email, and grade.\n ex: " +
  "*$user Johnny Appleseed $ Appleseed.J123@student.cbsd.org $ 12*");


});

bot.on("message", async message => {
  if (message.author.bot) return;

  //command / argument parsing
  let prefix = auth.prefix;
  let msg = message.content;

  let cutoff = msg.length;
  let indexSpace = msg.trim().indexOf(" ");
  if (indexSpace > 0) {
    cutoff = indexSpace;
  }

  let cmd = msg.trim().substring(prefix.length,cutoff);
  let args = msg.trim().substring(prefix.length + cmd.length).split(prefix);
  for (let i = 0; i < args.length; i++) {
    args[i] = args[i].trim();
  }
  /*console.log(cmd);
  console.log(args);*/


  if (msg.substring(0,prefix.length) === prefix) {
    let commandfile = bot.commands.get(cmd)
      || bot.commands.find
        (a => (a.help.aliases && a.help.aliases.includes(cmd)));

    if (message.channel.type === "dm" && !commandfile.help.dm) return;

    try {
      commandfile.run(bot, message, args);
    } catch (error) {
      console.log(error);
      return message.channel.send("Failed to execute command.");
    }
  }


});

bot.login(auth.token);
