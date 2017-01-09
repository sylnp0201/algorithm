'use strict';

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

class LinkedList {
  constructor() {
    this.first = null;
  }

  isEmpty() {
    return !this.first;
  }

  iterate(fn) {
    let current = this.first;

    while (current) {
      fn(current.value);
      current = current.next;
    }
  }

  add(value) {
    const newnode = new Node(value, null);

    if (this.isEmpty()) {
      this.first = newnode;
      return;
    }

    newnode.next = this.first;
    this.first = newnode;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const result = this.first.value;
    this.first = this.first.next;
    return result;
  }
}

module.exports = LinkedList;

// TEST CODE
// const list = new LinkedList();
//
// list.add(1);
// list.add(2);
// list.add(3);
//
// console.log(list.first.next.next);
//
// list.iterate(function(value) {
//   console.log(value);
// });
//
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
// console.log(list.pop());
