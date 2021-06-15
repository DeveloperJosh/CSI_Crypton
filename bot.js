require('dotenv').config()

const Discord = require('discord.js');
const AntiSpam = require('discord-anti-spam');
const FileSystem = require('fs');
const CommandFolders = FileSystem.readdirSync("./Commands");
const EventFiles = FileSystem.readdirSync("./Events").filter(File => File.endsWith(".js"));
const Mongoose = require('mongoose');
const Token = process.env['TOKEN'];

const Antispam = new AntiSpam({
	banMessage: "**{user_tag}** was banned for spamming.",
	banThreshold: 10,
	kickMessage: "**{user_tag}** was kicked for spamming.",
	kickThreshold: 7,
	ignoreBots: false, //Due to external clients, such as: Matrix, IRC. etc
	ignoredMembers: [],
	ignoredPermissions: ['ADMINISTRATOR', 'BAN_MEMBERS', 'KICK_MEMBERS'],
	maxDuplicatesBan: 12,
	maxDuplicatesKick: 10,
	maxDuplicatesMute: 8,
	maxDuplicatesWarning: 6,
	muteMessage: "**{user_tag}** was muted for spamming.",
	muteThreshold: 5,
  removeMessages: true,
	verbose: true,
  warnMessage: "{@user}, Please stop spamming.\nSincerely, staff team.",
  warnThreshold: 4,
});

const Client = new Discord.Client({});

Client.commands = new Discord.Collection();

for(const Folder of CommandFolders) {
  const CommandFiles = FileSystem.readdirSync(`./Commands/${Folder}`).filter(File => File.endsWith(".js")); 

  for(const File of CommandFiles) {
    const Command = require(`./Commands/${Folder}/${File}`);
    Client.commands.set(Command.name, Command);
  }
}

for(const File of EventFiles) {
  const Event = require(`./Events/${File}`);
  
  if(Event.once) {
    Client.once(Event.name, (...args) => Event.execute(...args, Client));
  } else {
    Client.on(Event.name, (...args) => Event.execute(...args, Client));
  }
}

Mongoose.connect(process.env['DB_SRV'], {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	userFindAndModify: true
}).then(() => {
	console.log("Successfully connected to MongoDB.");
}).catch(err => {
	console.log("Attempt to connect to MongoDB was unsuccessful. " + err);
});

Client.on("message", message => {
  Antispam.message(message);
	
  if (!message.content.startsWith(Prefix) || message.author.bot) return;

	const args = message.content.slice(Prefix.length).trim().split(/ +/);
	const Command = args.shift().toLowerCase();

	try {
		Client.commands.get(Command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.channel.send(`Error occurred during execution, or ${Command} was not a valid command.`);
	}
});

Client.login(Token);
