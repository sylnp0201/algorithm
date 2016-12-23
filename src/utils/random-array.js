'use strict';

const number = (n) => {
  const array = new Array(n);

  for (let i = 0; i < n; i++) {
    array[i] = Math.round(Math.random() * 100);
  }

  return array;
}

const string = (n) => {
  const WIDTH = 10;
  const array = new Array(n);

  // 97 - 122
  for (let i = 0; i < n; i++) {
    let str = '';

    for (let j = 0; j < WIDTH; j++) {
      const charCode = Math.round(Math.random() * 100) % 26 + 97;
      str += String.fromCharCode(charCode);
    }

    array[i] = str;
  }

  return array;
};

module.exports = {
  number,
  string,
};
