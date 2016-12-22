'use strict';

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  isEmpty() {
    return !this.first;
  }

  push(value) {
    const node = new Node(value);

    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      const lastNode = this.last;
      this.last = node;
      lastNode.next = node;
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    const node = this.first;
    this.first = node.next;

    if (this.isEmpty()) {
      this.last = null;
    }

    return node.value;
  }
}

module.exports = Queue;
