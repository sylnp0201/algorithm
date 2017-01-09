'use strict';

const assert = require('assert');
const BST = require('./bst');
const Queue = require('./queue');

function breathFirstSearch(bst) {
  const q = new Queue();
  const result = [];
  q.enqueue(bst.root);

  while(!q.isEmpty()) {
    const node = q.dequeue();
    result.push(node.key);

    if (node.left) {
      q.enqueue(node.left);
    }

    if (node.right) {
      q.enqueue(node.right);
    }
  }

  return result;
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

assert.deepEqual(breathFirstSearch(bst), [3, 1, 8, 2, 6, 9, 5, 7]);

function findLevelList(bst) {
  const result = [[bst.root]];
  let level = 0;

  while(true) {
    const list = [];

    result[level].forEach((node) => {
      if (node.left) {
        list.push(node.left);
      }

      if (node.right) {
        list.push(node.right);
      }
    });

    if (list.length > 0) {
      result[level + 1] = list;
    } else {
      break;
    }

    level++;
  }

  return result;
}

console.log(findLevelList(bst));
