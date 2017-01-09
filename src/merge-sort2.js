'use strict';

function merge(array, aux, lo, mid, hi) {
  for (let k = lo; k <= hi; k++) {
    aux[k] = array[k];
  }

  let i = lo;
  let j = mid + 1;

  for (let k = lo; k <= hi; k++) {
    if (i > mid && j <= hi) {
      array[k] = aux[j++];
    } else if (j > hi && i <= mid) {
      array[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      array[k] = aux[j++];
    } else {
      array[k] = aux[i++];
    }
  }
}

function _sort(array, aux, lo, hi) {
  if (lo >= hi) return;

  const mid = lo + Math.floor((hi - lo) / 2);

  _sort(array, aux, lo, mid);
  _sort(array, aux, mid + 1, hi);

  merge(array, aux, lo, mid, hi);
}

function sort(array) {
  const aux = array.slice(0);
  _sort(array, aux, 0, array.length - 1);

  return array;
}

const array = [5, 2, 3, 8, 9, 3, 1, 3, 2, 3, 0, 9, 8, 8, 3];
console.log(sort(array));
