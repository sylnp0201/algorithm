'use strict';

const Stack = require('./stack');

class MyQueue {
  constructor() {
    this.inStack = new Stack();
    this.outStack = new Stack();
  }

  isEmpty() {
    return this.inStack.isEmpty() && this.outStack.isEmpty();
  }

  enqueue(value) {
    this.inStack.push(value);
  }

  moveInToOut() {
    const inStack = this.inStack;

    while(!inStack.isEmpty()) {
      this.outStack.push(this.inStack.pop());
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.outStack.isEmpty()) {
      this.moveInToOut();
    }

    return this.outStack.pop();
  }
}

// TEST CODE
const q = new MyQueue();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log(q.dequeue());
console.log(q.dequeue());

q.enqueue(4);
q.enqueue(5);
q.enqueue(6);

console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.dequeue());

q.enqueue(7);
console.log(q.dequeue());
