'use strict';

const BST = require('./bst');

function maxHeight(node) {
  if (!node) {
    return 0;
  }

  return 1 + Math.max(maxHeight(node.left), maxHeight(node.right));
}

function minHeight(node) {
  if (!node) {
    return 0;
  }

  return 1 + Math.min(minHeight(node.left), minHeight(node.right));
}

function isBalanced(bst) {
  console.log(maxHeight(bst.root), minHeight(bst.root));
  return maxHeight(bst.root) - minHeight(bst.root) < 2;
}

// TEST CODE
const bst = new BST();

bst.put(2);
bst.put(1);
bst.put(3);
bst.put(4);
bst.put(0);
bst.put(1.5);
bst.put(-1);

console.log(isBalanced(bst));
