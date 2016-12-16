'use strict';

const exch = require('utils/exch');

module.exports = (a, lo, hi) => {
  lo = lo || 0;
  hi = hi || a.length - 1;

  for (let i = lo; i <= hi; i++) {
    for (let j = i; j > 0; j--) {
      if (a[j] >= a[j - 1]) break;
      exch(a, j, j - 1);
    }
  }

  return a;
};
