'use strict';

const LinkedList = require('./linked-list');

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

function _add(node, n1, n2, over) {
  if (!n1 && !n2) {
    if (!over) {
      return null;
    } else {
      return new Node(over, null);
    }
  }

  node = new Node(over || 0, null);

  if (n1.value) {
    node.value += n1.value;
  }

  if (n2.value) {
    node.value += n2.value;
  }

  const nextOver = node.value > 9 ? 1 : 0;

  node.next = _add(node.next, n1.next, n2.next, nextOver);

  node.value = node.value % 10;

  return node;
}

function addLists(list1, list2) {
  const result = new LinkedList();
  result.first = _add(result.first, list1.first, list2.first, 0);
  console.log(result.first, list1.first.value, list2.first.value, 0);

  return result;
}

// TEST CODE
const list1 = new LinkedList();
list1.add(5);
list1.add(1);
list1.add(3);

const list2 = new LinkedList();
list2.add(5);
list2.add(9);
list2.add(2);

const list3 = addLists(list1, list2);
list3.iterate(function(i) {
  console.log(i);
});
