module.exports = {
  name: "ready",
  once: true,
  
  execute(Client) {
    console.log(`USER: ${Client.user.tag}`);
    console.log(`ID: Client.user.id`);
    console.log("------------------------");
    
    Client.user.setActivity(`in ${Client.guilds.cache.size} server(s).`);
  }
}
