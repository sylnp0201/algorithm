'use strict';

/* an implementation of english dictionary using linked-list hashmap */
const data = require('data/dictionary.json');
const Hashmap = require('data-structure/hashmap');
const readline = require('readline');

function Dictionary(json) {
  this.hash = new Hashmap();

  Object.keys(json).forEach(word => {
    const key = word.toLowerCase();
    this.add(key, json[word])
  });
}

Dictionary.prototype.add = function(word, meaning) {
  const key = word.toLowerCase();
  this.hash.add(key, meaning);
};

Dictionary.prototype.get = function(word) {
  const key = word.toLowerCase();
  return this.hash.get(key);
};

module.exports = Dictionary;

// const dict = new Dictionary(data);
//
// // var rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout,
// //   terminal: false
// // });
// //
// // process.stdout.write(`Enter words, I\'ll help you find it.\n>`);
// //
// // rl.on('line', function(word) {
// //   const meaning = dict.get(word);
// //
// //   if (!meaning) {
// //     process.stdout.write(`Could not find ${word}\n>`);
// //
// //     return;
// //   }
// //
// //   process.stdout.write(`It means: ${meaning}\n>`)
// // });
