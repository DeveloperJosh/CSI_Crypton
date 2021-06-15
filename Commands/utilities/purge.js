module.export = {
  guildOnly: true,
  name: "purge",
  
  execute(message, args) {
    if(message.member.hasPermission("MANAGE_MESSAGES")) {
      const user = message.mentions.users.first();

      let amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
      amount = Math.floor(amount + 1);
      if (!amount) return message.reply('You need to specify an amount.');
      if (!amount && !user) return message.reply('You need to specify a user and an amount.');

      message.channel.messages.fetch({
        limit: 100,
      }).then((messages) => {
      if (user) {
        const filterBy = user ? user.id : Client.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      } else {
          messages = amount;
      }
          message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
      });
    }
  }
}
