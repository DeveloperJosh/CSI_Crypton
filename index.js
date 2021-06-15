const {ShardingManager} = require('discord.js');

const Manager = new ShardingManager('bot.js', {token: process.env['TOKEN']});
