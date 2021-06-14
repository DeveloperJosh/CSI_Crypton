require('dotenv').config()

const Discord = require('discord.js');
const AntiSpam = require('discord-anti-spam');
const FileSystem = require('fs');
const CommandFolders = FileSystem.readdirSync("./Commands");
const EventFiles = FileSystem.readdirSync("./Events").filter(File => File.endsWith(".js"));

const Client = new Discord.Client({});

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

Client.on("message", message => {
  if (!message.content.startsWith(Prefix) || message.author.bot) return;

	const args = message.content.slice(Prefix.length).trim().split(/ +/);
	const Command = args.shift().toLowerCase();

	try {
		client.commands.get(Command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply(`Error occurred during execution, or ${Command} was not a valid command.`);
	}
});

Client.login(Token);
