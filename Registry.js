const Discord = require('discord.js');
const Collections = require('./Collections');
/* eslint-disable class-methods-use-this */


/** This is here for users, not developers. */
class Registry {

  /** Allows users to register custom groups.*/
  registerGroups(groups) {
    if(!Array.isArray(groups)) throw new TypeError('Groups must be an array.')

    groups.forEach(group => {
      if(!group.id) throw new TypeError('No group ID provided.')
      if(!group.name) throw new TypeError('No group name provided.')
      Collections.groupRegistry.set(group.id, group.name)
    })
  }
}

module.exports = new Registry();
