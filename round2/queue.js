'use strict';

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.end = null;
  }

  isEmpty() {
    return this.front === null;
  }

  enqueue(value) {
    const newItem = new Node(value, null);

    if (this.isEmpty()) {
      this.front = newItem;
      this.end = this.front;
      return;
    }

    const oldend = this.end;
    this.end = newItem;
    oldend.next = newItem;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const oldfront = this.front;
    this.front = oldfront.next;

    if (this.isEmpty()) {
      this.end = null;
    }

    return oldfront.value;
  }
}

module.exports = Queue;

// TEST CODE
// const q = new Queue();
//
// [1,2,3,4,5,6].forEach((i) => {
//   q.enqueue(i);
// });
//
// while(!q.isEmpty()) {
//   console.log(q.dequeue());
// }
//
// q.enqueue(1);
// console.log(q.dequeue());
// q.enqueue(2);
// console.log(q.dequeue());
//
// console.log(q);
