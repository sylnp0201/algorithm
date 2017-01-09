'use strict';

const assert = require('assert');
const BST = require('./bst');

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function _toBST(array, lo, hi) {
  if (lo > hi) {
    return null;
  }

  if (lo === hi) {
    return new Node(array[lo]);
  }

  const mid = lo + Math.floor((hi - lo) / 2);

  const left = _toBST(array, lo, mid - 1);
  const right = _toBST(array, mid + 1, hi);

  const newnode = new Node(array[mid]);
  newnode.left = left;
  newnode.right = right;

  return newnode;
}

function arrayToBST(array) {
  const root = _toBST(array, 0, array.length - 1);

  return new BST(root);
}

function maxHeight(root) {
  if (!root) {
    return 0;
  }

  return Math.max(maxHeight(root.left), maxHeight(root.right)) + 1;
}

function minHeight(root) {
  if (!root) {
    return 0;
  }

  return Math.min(minHeight(root.left), minHeight(root.right)) + 1;
}

function isBalanced(bst) {
  const max = maxHeight(bst.root);
  const min = minHeight(bst.root);

  return max - min < 2;
}

// TEST CODE

const array = [1,2,3,4,5,6,7,8,9,10];
const bst = arrayToBST(array);

assert.equal(bst.root.value, 5);
assert(isBalanced(bst));
