'use strict';

const BST = require('./bst');

function height(root) {
  if (!root) {
    return 0;
  }

  return 1 + Math.max(height(root.left), height(root.right));
}

function diameter(root) {
  if (!root) {
    return 0;
  }

  const lh = height(root.left);
  const rh = height(root.right);

  return Math.max(lh + rh + 1, Math.max(diameter(root.left), diameter(root.right)));
}

// TEST CODE
const bst = new BST();

bst.put(2);
bst.put(1);
bst.put(4);
bst.put(3);
bst.put(5);
bst.put(6);
bst.put(-1);
bst.put(-2);
bst.put(-0.5);
bst.put(1.5);
bst.put(1.6);
bst.put(1.7);

console.log(diameter(bst.root));
