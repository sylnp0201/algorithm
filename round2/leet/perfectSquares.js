'use strict';

const assert = require('assert');

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
* @param {TreeNode} root
* @return {number[][]}
*/
var levelOrder = function(root) {
  let result = [[root.val]];
  let toCheck = [root];

  while(toCheck.length > 0) {
    const currentLevel = [];

    for (const node of toCheck) {
      if (node.left) {
        currentLevel.push(node.left);
      }

      if (node.right) {
        currentLevel.push(node.right);
      }
    }

    if (current.length > 0) {
      result.push(currentLevel.map(node => node.val));
    }
    toCheck = currentLevel;
  }

  return result;
};

const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

assert.equal(levelOrder(root), [[3], [9, 20], [15, 7]]);
