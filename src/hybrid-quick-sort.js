'use strict';

const exch = require('utils/exch');
const isort = require('insertion-sort');

const sort = (array, lo, hi) => {
  if (lo >= hi) return;

  if ((hi - lo) < 7) {
    isort(array, lo, hi);
    return;
  }

  let i = lo;
  let lt = lo;
  let gt = hi;
  let v = array[lo];

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

module.exports = (array) => {
  sort(array, 0, array.length - 1);

  return array;
}
