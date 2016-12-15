'use strict';

module.exports = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};
