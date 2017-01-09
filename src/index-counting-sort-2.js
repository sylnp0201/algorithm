'use strict';

function sort(array) {
  const aux = array.slice(0);
  const count = (new Array(11)).fill(0);
  const n = array.length;

  for (let i = 0; i < n; i++) {
    count[array[i] + 1]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  for (let i = 0; i < n; i++) {
    aux[count[array[i]]++] = array[i];
  }

  array = aux.slice(0);

  return array;
}

// const array = [5, 2, 3, 8, 9, 3, 1, 3, 2, 3, 0, 9, 8, 8, 3];
// console.log(sort(array));
