modules.export = {
  guildOnly: true,
  name: "ban",
  
  execute(message, args) {
    if(message.member.hasPermission("BAN_MEMBERS")) {
      let member = message.mentions.members.first();
      if(!member) return message.reply("Please mention a valid member of this server");
      if(!member.bannable) return message.reply("I cannot ban this member!");
      const banReason = args.slice(1).join(' ');

      member.ban({reason: banReason});
    }
  }
}
