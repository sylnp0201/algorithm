'use strict';

const BST = require('data-structure/binary-search-tree');
const randomArry = require('utils/random-array');

const bst = new BST();

const array = randomArry(20);

array.forEach(i => bst.add(i, `${i}th-element`));

const result = [];

bst.traverse(function(value) {
  console.log(value);
});
