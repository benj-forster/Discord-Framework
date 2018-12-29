const Command = require('../Command');
const Collections = require('../Collections');
const oneline = require('../utility/oneline.js')

module.exports = new Command({
  name: 'help',
  description: 'Information on all commands.',
  usage: 'help',
},
(client, message) => {
  const commandMap = Collections.commandRegistry.map(el => `\`${client.prefix()}${el.name}\`: ${el.description}`).join('\n');
  const defaultCommandMap = Collections.defaultCommandRegistry.map(el => `\`${client.prefix()}${el.name}\`: ${el.description}`).join('\n');

  message.channel.send(oneline`
  This is a placeholder help command.
  To use commands, use \`${client.prefix()}[command name here]\`
  

  ${commandMap ? commandMap : null}

  ${defaultCommandMap ? defaultCommandMap : null}
  `);
});
