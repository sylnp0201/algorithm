'use strict';

const BST = require('data-structure/red-black-binary-search-tree');

module.exports = (array) => {
  const bst = new BST();

  array.forEach(item => {
    bst.put(item);
  });

  array = [];

  bst.traverse((node) => {
    array.push(node.key);
  });

  return array;
}
