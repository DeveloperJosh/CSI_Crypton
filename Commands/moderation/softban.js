modules.export = {
  guildOnly: true,
  name: "sban",
  
  execute(message, args) {
    let member = message.mentions.members.first();
    if(!member) return message.reply("Please mention a valid member of this server");
    if(!member.bannable) return message.reply("I cannot ban this member!");
    const banReason = args.slice(1).join(' ');
    
    member.ban({days: 7, reason: banReason});
  }
}
