modules.export = {
  guildOnly: true,
  name: "kick",
  
  execute(message, args) {
    if(message.member.hasPermission("KICK_MEMBERS")) {
      let member = message.mentions.members.first();
      if(!member) return message.reply("Please mention a valid member of this server");
      if(!member.kickable) return message.reply("I cannot ban this member!");

      member.kick();
    }
  }
}
