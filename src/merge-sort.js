'use strict';

const merge = (a, aux, lo, mid, hi) => {
  if (a[mid] <= a[mid + 1]) return;

  for (let k = lo; k <= hi; k++) {
    aux[k] = a[k];
  }

  let i = lo;
  let j = mid + 1;

  for (let k = lo; k <= hi; k++) {
    if (i > mid)              a[k] = aux[j++];
    else if (j > hi)          a[k] = aux[i++];
    else if (aux[j] < aux[i]) a[k] = aux[j++];
    else                      a[k] = aux[i++];
  }
}

const sort = (array, aux, lo, hi) => {
  if (lo >= hi) return;

  const mid = lo + Math.floor((hi - lo) / 2);

  sort(array, aux, lo, mid);
  sort(array, aux, mid + 1, hi);
  merge(array, aux, lo, mid, hi);
}

module.exports = (array) => {
  const aux = array.slice(0);

  sort(array, aux, 0, array.length - 1);

  return array;
}
