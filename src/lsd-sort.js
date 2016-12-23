'use strict';

const R = 256; // all ascii chars
const charToCode = (c) => c.charCodeAt(0);

function leastSignificantDigitSFirstSort(array) {
  const radix = array[0].length;

  for (let d = radix - 1; d >= 0; d--) {
    const aux = new Array(array.length);
    const count = (new Array(R + 1)).fill(0);

    array.forEach(s => {
      count[charToCode(s[d]) + 1]++;
    });

    for (let i = 1; i < count.length; i++) {
      count[i] = count[i] + count[i - 1];
    }

    array.forEach(s => {
      aux[count[charToCode(s[d])]++] = s;
    });

    array = aux;
  }

  return array;
};

module.exports = leastSignificantDigitSFirstSort;

// const array = [
//   'abc',
//   'aaa',
//   'ddd',
//   'dca',
//   'bbb',
//   'ccc',
// ];
//
// console.log(leastSignificantDigitSFirstSort(array));
