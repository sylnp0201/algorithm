'use strict';

module.exports = function(array) {
  const n = array.length;

  for (let i = 1; i < n; i++) {
    if (array[i] < array[i-1]) {
      return false;
    }
  }

  return true;
}
