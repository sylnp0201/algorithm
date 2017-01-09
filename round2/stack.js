'use strict';

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next || null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  isEmpty() {
    return this.top === null;
  }

  push(value) {
    this.top = new Node(value, this.top);
    this.length += 1;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.top.value;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.top.value;
    this.top = this.top.next;
    this.length -= 1;

    return value;
  }
}

module.exports = Stack;

// TEST CODE
// const s = new Stack();
//
// [1,2,3,4,5,6].forEach((i) => {
//   s.push(i);
// });
//
// console.log(s);
//
// while(!s.isEmpty()) {
//   console.log(s.pop());
// }
