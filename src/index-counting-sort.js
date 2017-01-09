'use strict';

const R = 256;
const charToCode = (char) => char.charCodeAt(0);

// Type of array is char[]
function indexCountingSort(array) {
  const count = (new Array(R + 1)).fill(0);
  const aux = new Array(array.length);

  array.forEach(c => {
    count[charToCode(c) + 1]++;
  });


  for (let i = 1; i < count.length; i++) {
    count[i] = count[i] + count[i - 1];
  }

  array.forEach(c => {
    aux[count[charToCode(c)]++] = c;
  });

  array = aux;

  return array;
};

module.exports = indexCountingSort;

// const array = ['c', 'b', 'a', 'c', 'e', 'a', 'd', 'g', 'f', 'f', 'c', 'c', 'a'];
// console.log(indexCountingSort(array));
