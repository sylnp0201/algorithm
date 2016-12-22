'use strict';

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        const done = this.isEmpty();
        const value = this.pop();

        return {
          value,
          done
        };
      }
    }
  }

  isEmpty() {
    return !this.top;
  }

  push(value) {
    const node = new Node(value, this.top);
    this.top = node;
  }

  pop() {
    if (this.isEmpty()) return null;

    const value = this.top.value;

    this.top = this.top.next;

    return value;
  }
}

module.exports = Stack;

// TEST CODE
// const stack = new Stack();
// stack.push(1);
// stack.push(2);
// stack.push(3);
//
// for (let i of stack) {
//   console.log(i);
// }
