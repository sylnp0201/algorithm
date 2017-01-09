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

  [Symbol.iterator]() {
    return {
      next: () => ({
        done: this.isEmpty(),
        value: this.pop()
      })
    };
  }

  isEmpty() {
    return !this.first;
  }

  push(value) {
    const newnode = new Node(value, null);

    if (this.isEmpty()) {
      this.first = newnode;
      this.last = this.first;
    }

    const oldlast = this.last;
    oldlast.next = newnode;
    this.last = newnode;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const result = this.first.value;

    this.first = this.first.next;

    if (this.isEmpty()) {
      this.last = null;
    }

    return result;
  }
}

module.exports = Queue;

// TEST CODE
const q = new Queue();
q.push(1);
q.push(2);
q.push(3);

for (let i of q) {
  console.log(i);
}
