'use strict';

const BST = require('./bst');

function findNode(node, x) {
  if (!node) {
    return null;
  }

  if (x < node.key) {
    return findNode(node.left, x);
  } else if (x > node.key) {
    return findNode(node.right, x);
  }

  return node;
}

function leftMost(node) {
  if (!node) {
    return null;
  }

  while(node.left) {
    node = node.left;
  }

  return node;
}

function successor(root, x) {
  if (!root) {
    return null;
  }

  const xnode = findNode(root, x);

  if (!xnode.parent || xnode.right) {
    return leftMost(xnode.right).key;
  }

  if (xnode.parent.left === xnode) {
    return xnode.parent;
  } else {
    let p = xnode.parent;
    while(p.parent) {
      if (p.parent.left === p) {
        return p.parent;
      }

      p = p.parent;
    }
  }

  return null;
}

// TEST CODE
const bst = new BST();

bst.put(3);
bst.put(8);
bst.put(1);
bst.put(6);
bst.put(9);
bst.put(2);
bst.put(5);
bst.put(7);
bst.put(4);
