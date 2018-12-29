const Discord = require('discord.js');
const Registry = require('./Registry.js');

class Command {
  constructor(info, run) {
    if (typeof info !== 'object') throw new TypeError('Invalid \'options\' structure.');
    if (typeof run !== 'function') throw new TypeError('run must be a function!');
    if (!info.name) throw new TypeError('No command name provided.');
    if (!info.usage) throw new TypeError('No command usage provided.');
    if (!info.description) throw new TypeError('No command description provided.');

    this._name = info.name;
    this._usage = info.usage;
    this._description = info.description;
    this._run = run;
    this._group = info.group ? info.group : 'gencmds';
  }

  get name() {
    return this._name;
  }

  get usage() {
    return this._usage;
  }

  get description() {
    return this._description;
  }

  get runMethod() {
    return this._run;
  }

  get group() {
    return this._group;
  }
}

module.exports = Command;
