const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const Collections = require('./Collections.js');
const Registry = require('./Registry');

class FrameClient extends Discord.Client {
  constructor(options = {}) {
    if (!options) throw new TypeError('No options provided.');
    if (typeof options.commandResponse === 'undefined') options.commandResponse = true;
    if(typeof options.commandResponse !== 'boolean') throw new TypeError('commandResponse must be boolean.')
    if (!options.owners) throw new TypeError('No client owners provided.');
    if (!Array.isArray(options.owners)) throw new TypeError('Owners must be an array.');

    super(options);
    this.options = options;
    if (!options.prefix) this._prefix = '!';
    else this._prefix = options.prefix;

    this._owners = options.owners
  }


  /* Getters */
  get prefix() {
    return this._prefix
  }

  get owner() {
    return this._owners
  }
  /* */


  /* Events */

  /** Ready Event */
  onReady(readyFunction) {
    this.on('ready', () => {

      /** Read the commands directory */
      fs.readdir('./commands/', (err, files) => {
        if (err) throw `Error reading command directory: ${err.message}`;
        if (files.length <= 0) throw new TypeError('Error reading command directory: No commands found.');
        const jsfile = files.filter(f => f.split('.').pop() === 'js');
        if (jsfile.length <= 0) throw 'Command Files not found (please make one)';
        jsfile.forEach((f, i) => {
          const module = `./commands/${f}`;
          const cmd = require(path.resolve(module));
          Collections.commandRegistry.set(cmd.name, {
            name: cmd.name,
            usage: cmd.usage,
            description: cmd.description,
            runMethod: cmd.runMethod,
            group: cmd.group,
          });
        });
      });

      if (readyFunction) {
        if (typeof readyFunction !== 'function') throw new TypeError('Ready event must be a function.');
        readyFunction();
      }
    });
  }


  /** Message Event */
  onMessage(messageFunction) {
    const event = this.on('message', (message) => {

      /** If a command is detected, retrieve that commands runMethod from commandRegistry (and run it) */
      if (message.content.startsWith(this._prefix)) {
        const cmd = message.content.toLowerCase().split(' ')[0].slice(this._prefix.length);
        if(cmd.length <= 0) return;
        if (Collections.commandRegistry.get(cmd)) Collections.commandRegistry.get(cmd).runMethod(this, message);
        else if(cmd === 'help') require('./defaultCommands/help').runMethod(this, message);
        else if(this.options.commandResponse) message.channel.send(`\`${cmd}\` is an unknown command, please try again!`)
      }

      /** Whatever the user wants to happen when the message event is fired */
      if (messageFunction) {
        if (typeof messageFunction !== 'function') throw new TypeError('Message event must be a function.');
        messageFunction(message);
      }
    });
    return event;
  }

  /** Guild Member Add Event */
  onGuildMemberAdd({channel, GMAFunction}) {
    /** Both channel and GMAFunction are optional, if neither are provided, this will simply do nothing. */
    const event = this.on('guildMemberAdd', member => { 
    /** Channel: This will simply log that the user joined in a user chosen logs channel */
     if(channel) {
      let types = [
        'dm',
        'group',
        'text',
        'voice',
        'category'
      ]

      if(!types.includes(channel.type)) throw new TypeError('Invalid Channel provided.')
     }

    /** GMAFunction: GuildMemberAddFunction, this is what a user wants to happen everytime the guildMemberAdd event is fired */
     if(GMAFunction) {
      if(typeof GMAFunction !== 'function') throw new TypeError('GMAFunction must be a function.');
      GMAFunction(member);
     }
   })
  }
  /* */
}

module.exports = FrameClient;
