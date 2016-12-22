'use strict';

const R = 256; // all ascii chars
const charToCode = (char) => char.charCodeAt(0);

function leastSignificantDigitSFirstSort(array) {
  // const count = (new Array(R + 1)).fill(0);
  // const aux = new Array(array.length);
  //
  // array.forEach(c => {
  //   count[charToCode(c) + 1]++;
  // });
  //
  // for (let i = 1; i < count.length; i++) {
  //   count[i] = count[i] + count[i - 1];
  // }
  //
  // array.forEach(c => {
  //   aux[count[charToCode(c)]++] = c;
  // });
  //
  // array = aux;
  //
  return array;
};

module.exports = leastSignificantDigitSFirstSort;
