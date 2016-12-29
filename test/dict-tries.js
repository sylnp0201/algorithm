'use strict';

/* an implementation of english dictionary using n-ary tries */
const data = require('data/dictionary.json');
const Tries = require('data-structure/r-nary-tries');
const readline = require('readline');

const CHAR_OFFSET = 'a'.charCodeAt(0);

function toCharList(str) {
  if(typeof str !== 'string') {
    throw new Error('The input must be a string!');
  }

  return Array.prototype.map.call(
    str.toLowerCase(),
    c => c.charCodeAt(0) - CHAR_OFFSET
  );
}

function toString(charCodeList) {
  return charCodeList
    .map(c => String.fromCharCode(c + CHAR_OFFSET))
    .join('');
}

function Dictionary(json) {
  this.tries = new Tries(26);

  Object.keys(json).forEach(word => {
    this.add(word, json[word])
  });
}

Dictionary.prototype.add = function(word, meaning) {
  const key = toCharList(word);
  this.tries.add(key, meaning);
};

Dictionary.prototype.get = function(word) {
  const key = toCharList(word);

  return this.tries.get(key);
};

Dictionary.prototype.withPrefix = function(prefix) {
  const key = toCharList(prefix);

  return this.tries.prefix(key).map(key => toString(key));
};

module.exports = Dictionary;

// const dict = new Dictionary(data);

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });
//
// process.stdout.write(`Enter words, I\'ll help you find it.\n>`);
//
// rl.on('line', function(word) {
//   const meaning = dict.get(word);
//
//   if (!meaning) {
//     process.stdout.write(`Could not find ${word}\n>`);
//
//     const suggestion = dict.withPrefix(word);
//
//     if (suggestion && suggestion.length > 0) {
//       process.stdout.write(`Did you mean ${suggestion.join(', ')}\n>`);
//     }
//
//     return;
//   }
//
//   process.stdout.write(`It means: ${meaning}\n>`)
// });
