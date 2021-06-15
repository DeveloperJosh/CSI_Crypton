modules.export = {
  guildOnly: true,
  name: "unban",
  
  execute(message, args) {
    if(message.member.hasPermission("BAN_MEMBERS")) {
      let userID = args[0]
      message.guild.fetchBans().then(bans=> {
      if(bans.size == 0) return 
      let bUser = bans.find(b => b.user.id == userID)
      if(!bUser) return
      message.guild.members.unban(bUser.user)
    }
  }
}
