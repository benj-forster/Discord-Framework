const Discord = require('discord.js');

module.exports = {
  Client: require('./client.js'),
  Command: require('./Command'),
  Collections: require('./Collections'),
  Registry: require('./Registry'),
  oneline: require('./utility/oneline'),
  // MaximusMessage: require('./functions/MaximusMessage'),
};
