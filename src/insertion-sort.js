'use strict';

const exch = require('utils/exch');

module.exports = (a) => {
  const n = a.length;

  for (let i = 0; i < n; i++) {
    for (let j = i; j > 0; j--) {
      if (a[j] >= a[j - 1]) break;
      exch(a, j, j - 1);
    }
  }

  return a;
};
