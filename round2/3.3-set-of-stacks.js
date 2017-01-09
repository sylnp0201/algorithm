'use strict';

const Stack = require('./stack');

class SetOfStacks {
  constructor(N) {
    this.s = [];
    this.N = N;
    this.lastStack = null;
  }

  isEmpty() {
    for (let i = 0; i < this.s.length; i++) {
      const substack = this.s[i];
      if (!substack.isEmpty()) {
        return false;
      }
    }

    return true;
  }

  push(value) {
    if (this.lastStack && this.lastStack.length < this.N) {
      this.lastStack.push(value);
    } else {
      const newStack = new Stack();
      newStack.push(value);
      this.s.push(newStack);
      this.lastStack = newStack;
    }
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const last = this.lastStack;

    const value = last.pop();

    if (last.isEmpty()) {
      if (this.isEmpty()) {
        this.lastStack = null;
      } else {
        this.lastStack = this.s[this.s.length - 2];
      }
      this.s.length -= 1;
    }

    return value;
  }
}

// TEST CODE
const ss = new SetOfStacks(3);

ss.push(1);
ss.push(2);
ss.push(3);
ss.push(4);
ss.push(5);
ss.push(6);
ss.push(7);
ss.push(8);

console.log(ss);

console.log(ss.pop());
console.log(ss.pop());
console.log(ss.pop());
console.log(ss.pop());

console.log(ss);
