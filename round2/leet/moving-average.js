'use strict';

const assert = require('assert');

class MovingAverage {
  constructor(size) {
    this.size = size;
    this.window = [];
    this.sum = 0;
  }

  next(val) {
    if (this.window.length < this.size) {
        this.sum += val;
        this.window.push(val);
        return this.sum / this.window.length;
    }

    const diff = val - this.window.shift();
    this.sum += diff;
    this.window.push(val);
    return this.sum / this.size;
  }
}

const m = new MovingAverage(3);

assert.deepEqual(m.next(1), 1);
assert.deepEqual(m.next(10), (1+10)/2);
assert.deepEqual(m.next(3), (1+10+3)/3);
assert.deepEqual(m.next(5), (10+3+5)/3);
assert.deepEqual(m.next(8), (3+5+8)/3);
