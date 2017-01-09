'use strict';

const assert = require('assert');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestConsecutive = function(root) {
  if (!root) {
    return 0;
  }

  let longest = 0;

  function findLongest(node, count, target) {
    if (!node) {
      return;
    }

    if (node.val === target) {
      count++;
    } else {
      count = 1;
    }

    longest = Math.max(count, longest);

    findLongest(node.left, count, node.val + 1);
    findLongest(node.right, count, node.val + 1);
  }

  findLongest(root, 0, root.val);

  return longest;
};

const root = new TreeNode(1);
root.right = new TreeNode(3);
root.right.left = new TreeNode(2);
root.right.right = new TreeNode(4);
root.right.right.right = new TreeNode(5);

assert.equal(longestConsecutive(root), 3);
