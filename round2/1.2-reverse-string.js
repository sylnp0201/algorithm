'use strict';

const exch = require('./exch');

function reverse(str) {
  const list = str.split('');
  const mid = Math.floor(str.length / 2);
  for (let i = 0; i < mid; i++) {
    exch(list, i, str.length - i - 1);
  }

  return list.join('');
}

// TEST CODE
console.log(reverse('123456'));
