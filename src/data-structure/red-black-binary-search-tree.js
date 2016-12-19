'use strict';

const RED = true;

function Node(key, value, color) {
  this.key = key;
  this.value = value;
  // RED by default for new node
  this.color = typeof color === 'undefined' ? RED : color;

  this.left = null;
  this.right = null;
}

function BST() {
  this.root = null;
}

function isRed(node) {
  return !!node && node.color === RED;
}

function _rotateLeft(node) {
  // console.log('_rotateLeft');
  if (!node.right || !isRed(node.right)) {
    throw new Error('Can not rotate left, node.right is null or not RED');
  }

  const origRight = node.right;

  node.right = origRight.left;
  origRight.left = node;
  origRight.color = node.color;
  node.color = RED;

  return origRight;
}

function _rotateRight(node) {
  // console.log('_rotateRight');
  if (!node.left || !isRed(node.left)) {
    throw new Error('Can not rotate right, node.left is null or not RED');
  }

  const origLeft = node.left;

  node.left = origLeft.right;
  origLeft.right = node;
  origLeft.color = node.color;
  node.color = RED;

  return origLeft;
}

function _flipColor(node) {
  // console.log('_flipColor');
  if (!isRed(node.left) || !isRed(node.right)) {
    throw new Error('Can not flip color, left or right child is not RED');
  }

  node.left.color = !node.left.color;
  node.right.color = !node.right.color;
  node.color = !node.color;

  return node;
}

function _put(node, key, value) {
  if (!node) {
    return new Node(key, value, RED);
  }

  if (key < node.key) {
    node.left = _put(node.left, key, value);
  } else if (key > node.key) {
    node.right = _put(node.right, key, value);
  } else {
    node.value = value;
  }

  if (isRed(node.right) && !isRed(node.left)) {
    node = _rotateLeft(node);
  }

  if (isRed(node.left) && !!node.left && isRed(node.left.left)) {
    node = _rotateRight(node);
  }

  if (isRed(node.right) && isRed(node.left)) {
    node = _flipColor(node);
  }

  return node;
}

function _get(node, key) {
  if (!node) return null;

  if (key > node.key) {
    return _get(node.right, key);
  } else if (key < node.key) {
    return _get(node.left, key);
  }

  return node.value;
}

function getColor(node) {
  if (!node) return null;

  return node.color === RED ? 'RED' : 'BLACK';
}

function _printSubTree(node) {
  if (!node) return;

  let nodeStr = `${node.key} (${getColor(node)})`;

  if (node.left) {
    nodeStr = `${node.left.key}(${getColor(node.left)}) <- ${nodeStr}`;
  }

  if (node.right) {
    nodeStr = `${nodeStr} -> ${node.right.key}(${getColor(node.right)})`;
  }

  console.log(nodeStr); // eslint-disable-line  no-console

  _printSubTree(node.left);
  _printSubTree(node.right);
}

function _traverse(node, fn) {
  if (!node) return;
  _traverse(node.left, fn);
  fn(node);
  _traverse(node.right, fn);
}

BST.prototype.put = function(key, value) {
  this.root = _put(this.root, key, value);
};

BST.prototype.get = function(key) {
  return _get(this.root, key);
};

BST.prototype.traverse = function(fn) {
  _traverse(this.root, fn);
};

BST.prototype.toString = function() {
  _printSubTree(this.root);
};

module.exports = BST;

// TEST CODE
// const bst = new BST();
// bst.put(3, 'three');
// bst.put(2, 'two');
// bst.put(4, 'four');
// bst.put(1, 'one');
// bst.put(5, 'five');
// bst.put(7, 'seven');
// bst.put(8, 'eight');
// bst.put(9, 'nine');
// bst.put(6, 'six');

// console.log(bst.get(3));
// console.log(bst.get(4));
// console.log(bst.get(1));
// console.log(bst.get(6));
// bst.toString();
