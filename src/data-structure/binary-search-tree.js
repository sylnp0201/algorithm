'use strict';

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.left = null;
  this.right = null;
}

function BST () {
  this.root = null;
}

function _add(node, key, value) {
  if (!node) return new Node(key, value);

  if (key < node.key) {
    node.left = _add(node.left, key, value);
  } else {
    node.right = _add(node.right, key, value);
  }


  return node;
}

function _get(node, key) {
  if (!node) return null;

  if (key < node.key) {
    return _get(node.left, key);
  } else if (key > node.key) {
    return _get(node.right, key);
  }

  return node.value;
}

function _traverse(node, fn) {
  if (!node) return;

  _traverse(node.left, fn);
  fn(node.value);
  _traverse(node.right, fn);
}

BST.prototype.add = function(key, value) {
  this.root = _add(this.root, key, value);
};

BST.prototype.get = function(key) {
  return _get(this.root, key);
}

BST.prototype.traverse = function(fn) {
  return _traverse(this.root, fn);
}

module.exports = BST;
