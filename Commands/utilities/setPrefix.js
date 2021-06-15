module.exports = {
  guildOnly: true,
  name: "prefix",
  
  execute(message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.inlineReply("You don't have permission to use this command");

      const newPrefix = args[0];

      const prefixEmbed = new Discord.MessageEmbed()
        .setTitle("Failed")
        .setColor("RED")
        .setDescription("Usage : \n`setprefix <new prefix>`")
      if(!newPrefix) return message.channel.send(prefixEmbed);

      prefix.setPrefix(`${newPrefix}`, message.guild.id)
      await message.channel.send(`Prefix seted to \`${newPrefix}\``)
  }
}
