/**
 * All credit goes to rexxars on NPM
 * https://www.npmjs.com/package/oneline
 * 
 * This code is slighty altered from his original code.
 */



module.exports = (strings, ...keys) => strings
  .reduce((result, part, i) => result + part + (keys[i] || ''), '')
  .trim();
