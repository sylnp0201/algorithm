'use strict';

const assert = require('assert');

/**
 * @param {string[]} sentence
 * @param {number} rows
 * @param {number} cols
 * @return {number}
 */
var wordsTyping = function(sentence, rows, cols) {
  let totalLength = 0;
  for (let i = 0; i < sentence.length; i++) {
    const word = sentence[i];
    if (word.length > cols) {
      return 0;
    }
    totalLength += word.length + 1;
  }
  // console.log('total', totalLength);

  let result = 0;
  let spots = cols;
  let index = 0;

  for (let i = 0; i < rows; i++) {
    result += Math.floor(cols / totalLength);
    spots = cols % totalLength;
    while(spots >= sentence[index].length) {
      spots -= sentence[index].length + 1;
      index++;
      if (index === sentence.length) {
        index = 0;
        result++;
      }
    }
  }

  return result;
};

assert.equal(wordsTyping(["hello", "world"],2,8), 1);
assert.equal(wordsTyping(["a", "bcd", "e"],3,6), 2);
assert.equal(wordsTyping(["I", "had", "apple", "pie"],4,5), 1);
