const Discord = require('discord.js');

const commandRegistry = new Discord.Collection();

const groupRegistry = new Discord.Collection();

const defaultCommandRegistry = new Discord.Collection();


module.exports = {
  commandRegistry,
  groupRegistry,
  defaultCommandRegistry,
};
