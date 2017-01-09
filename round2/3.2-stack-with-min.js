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
    this.min = null;
  }

  isEmpty() {
    return this.top === null;
  }

  push(value) {
    if (this.isEmpty()) {
      this.min = value;
    } else {
      if (this.min > value) {
        this.min = value;
      }
    }

    this.top = new Node(value, this.top);
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const value = this.top.value;
    this.top = this.top.next;

    return value;
  }
}

// TEST CODE
const s = new Stack();

[7,3,2,4,6,5].forEach((i) => {
  s.push(i);
  console.log('min', s.min);
});


while(!s.isEmpty()) {
  console.log(s.pop());
  console.log('min', s.min);
}
