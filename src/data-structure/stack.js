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

  // wrong way of using iterator
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
    const newnode = new Node(value, null);

    if (this.isEmpty()) {
      this.top = newnode;
      return;
    }

    newnode.next = this.top;
    this.top = newnode;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const result = this.top.value;
    this.top = this.top.next;

    return result;
  }
}

module.exports = Stack;

// TEST CODE
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);

for (let i of [0,1,2]) {
  console.log(stack.pop());
}

stack.push(4);
stack.push(5);
stack.push(6);

for (let i of stack) {
  console.log(i);
}
