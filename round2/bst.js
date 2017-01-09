'use strict';

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function _put(node, key, value) {
  if (!node) {
    return new Node(key, value);
  }

  if (key < node.key) {
    node.left = _put(node.left, key, value);
  } else if (key > node.key) {
    node.right = _put(node.right, key, value);
  } else {
    node.value = value;
  }

  return node;
}

function _inorder(node, fn) {
  if (!node) {
    return;
  }

  _inorder(node.left, fn);
  fn(node.value);
  _inorder(node.right, fn);
}

class BST {
  constructor(root) {
    this.root = root || null;
  }

  put(key, value) {
    this.root = _put(this.root, key, value);
  }

  get(key) {
    let node = this.root;

    while(node) {
      console.log(key, key < node.key, key > node.key, key === node.key);
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else {
        return node.value;
      }
    }

    return null;
  }

  inorder(fn) {
    _inorder(this.root, fn);
  }
}

module.exports = BST;

// TEST CODE
// const bst = new BST();
//
// bst.put(2, 'two');
// bst.put(1, 'one');
// bst.put(3, 'three');
// bst.put(6, 'six');
// bst.put(4, 'four');
// bst.put(5, 'five');
//
// console.log(bst.get(1));
// console.log(bst.get(5));
//
// bst.inorder(function(value) {
//   console.log(value);
// });
