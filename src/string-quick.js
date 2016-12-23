'use strict';

const exch = require('utils/exch');

const sort = (array, lo, hi, d) => {
  if (lo >= hi) return;

  let lt = lo;
  let gt = hi;
  let i = lo + 1;
  let v = array[lo][d];

  while(i <= gt) {
    const t = array[i][d];

    if (t < v) {
      exch(array, i++, lt++);
    } else if (t > v) {
      exch(array, i, gt--);
    } else {
      i++;
    }
  }

  sort(array, lo, lt - 1, d);
  if (v) sort(array, lt, gt, d + 1);
  sort(array, gt + 1, hi, d);
};

function threeWayQuickSort(array) {
  sort(array, 0, array.length - 1, 0);

  return array;
}

module.exports = threeWayQuickSort;

// const array = [
//   'abc',
//   'aaab',
//   'aaac',
//   'ddd',
//   'dcae',
//   'bbbb',
//   'bbbd',
//   'bb',
// ];
//
// console.log(threeWayQuickSort(array));
