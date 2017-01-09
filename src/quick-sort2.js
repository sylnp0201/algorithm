'use strict';

const exch = require('utils/exch');

const sort = (array, lo, hi) => {
  if (lo >= hi) return;

  let lt = lo;
  let gt = hi;
  let i = lo + 1;
  const v = array[lo];

  while(i <= gt) {
    if (array[i] < v) {
      exch(array, i++, lt++);
    } else if (array[i] > v) {
      exch(array, i, gt--);
    } else {
      i++;
    }
  }

  sort(array, lo, lt - 1);
  sort(array, gt + 1, hi);
};

const quick = (array) => {
  sort(array, 0, array.length - 1);

  return array;
};

const array = [5, 2, 3, 8, 9, 3, 1, 3, 2, 3, 0, 9, 8, 8, 3];
console.log(quick(array));
