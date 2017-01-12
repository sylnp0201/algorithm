'use strict';

const assert = require('assert');

/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
var encode = function(strs) {
  let out = '';

  for (let i = 0; i < strs.length; i++) {
    out += `${strs[i].replace(/#/g, ' # ')}##`;
  }

  return out;
};

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function(s) {
  let result = [];

  const array = s.split('##');

  for (let i = 0; i < array.length - 1; i++) {
    result.push(array[i].replace(/ # /g, '#'));
  }

  return result;
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */

assert.equal(encode(['hello,','world']), 'hello,##world##');
assert.equal(encode(['']), '##');
assert.equal(encode([]), '');
assert.deepEqual(decode(encode(['hello,','world'])), ['hello,','world']);
assert.deepEqual(decode(encode([])), []);
assert.deepEqual(decode(encode([''])), ['']);
