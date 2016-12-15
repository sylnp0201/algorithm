'use strict';

module.exports = function(n) {
  const array = new Array(n);

  for (let i = 0; i < n; i++) {
    array[i] = Math.round(Math.random() * 100);
  }

  return array;
}
