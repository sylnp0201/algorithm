'use strict';

const exch = require('./exch');

function sort(word, lo, hi) {
  if (lo >= hi) return;

  const mid = lo + Math.floor((hi - lo) / 2);
  let lt = lo;
  let i = lo + 1;
  let gt = hi;
  const v = word[lo];

  while(i <= gt) {
    if (word[i] < v) {
      exch(word, lt++, i++);
    } else if (word[i] > v) {
      exch(word, gt--, i);
    } else {
      i++;
    }
  }

  sort(word, lo, lt - 1);
  sort(word, gt + 1, hi);
}

function uniqueChars(word) {
  const charList = word.split('');
  sort(charList, 0, charList.length - 1);

  for (let i = 0; i < charList.length - 1; i++) {
    if (charList[i] === charList[i + 1]) {
      return false;
    }
  }

  return true;
}

console.log(uniqueChars('abcdefg'));
console.log(uniqueChars('abcedc'));
console.log(uniqueChars('abcdefga'));
