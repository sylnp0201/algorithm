'use strict';

const assert = require('assert');

function abbr(word) {
  const n = word.length;

  if (n < 3) {
    return word;
  }

  return `${word[0]}${n-2}${word[n-1]}`;
}

/**
 * @constructor
 * @param {string[]} dictionary
 */
var ValidWordAbbr = function(dictionary) {
  const hash = {};

  dictionary.forEach(word => {
    const key = abbr(word);
    if (hash[key]) {
      if (hash[key].length === 1 && hash[key][0] !== word) {
        hash[key].push(word);
      }
    } else {
      hash[key] = [word];
    }
  });

  this.hash = hash;
};

/**
 * @param {string} word
 * @return {bool}
 */
ValidWordAbbr.prototype.isUnique = function(word) {
  const words = this.hash[abbr(word)];

  if (!words) {
    return true;
  }

  if (words.length === 1 && words[0] === word) {
    return true;
  }

  return false;
};

/**
 * Your ValidWordAbbr object will be instantiated and called as such:
 * var vwa = new ValidWordAbbr(dictionary);
 * vwa.isUnique("word");
 * vwa.isUnique("anotherWord");
 */

assert.equal(abbr('it'), 'it');
assert.equal(abbr('dog'), 'd1g');
assert.equal(abbr('internationalization'), 'i18n');
assert.equal(abbr('localization'), 'l10n');

const vw1 = new ValidWordAbbr([ "deer", "door", "cake", "card" ]);

assert.equal(vw1.isUnique("dear"), false);
assert.equal(vw1.isUnique("cart"), true);
assert.equal(vw1.isUnique("cane"), false);
assert.equal(vw1.isUnique("make"), true);
assert.equal(vw1.isUnique("cake"), true);

const vw2 = new ValidWordAbbr([ 'a', 'a' ]);
assert.equal(vw2.isUnique('a'), true);
