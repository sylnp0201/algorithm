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
  } else {
    node.right = _put(node.right, key, value);
  }

  return node;
}

function _get(node, key) {
  if (!node) {
    return null;
  }

  if (key < node.key) {
    return _get(node,left, key);
  } else if (key > node.key) {
    return _get(node.right, key);
  }

  return node.value;
}

class BST {
  constructor() {
    this.root = null;
  }

  put(key, value) {
    this.root = _put(this.root, key, value);
  }

  get(key) {
    return _get(this.root, key);
  }
}
