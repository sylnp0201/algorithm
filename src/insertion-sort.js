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

// const sort = (a) => {
//   const length = a.length;
//
//   for (let i = 0; i < length; i++) {
//     for (let j = i; j > 0; j--) {
//       if (a[j] < a[j - 1]) {
//         exch(a, j, j - 1);
//       } else {
//         break;
//       }
//     }
//   }
//
//   return a;
// };

// const array = ['c', 'b', 'a', 'c', 'e', 'a', 'd', 'g', 'f', 'f', 'c', 'c', 'a'];
// console.log(sort(array));
