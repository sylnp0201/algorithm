'use strict';

const exch = require('utils/exch');

function Node(key, value) {
  this.key = key;
  this.value = value;
}

// MinPQ
function PQ() {
  this.s = [null];
  this.n = 0; // the length of the queue
  this.keys = {};
}

PQ.prototype.isEmpty = function() {
  return this.n === 0;
}

PQ.prototype.add = function(key, value) {
  let n = this.n;

  this.s[++n] = new Node(key, value);
  this.keys[key] = true;
  this.swim(this.n);

  this.n = n;
};

PQ.prototype.delMin = function() {
  let n = this.n;

  if (n <= 0) {
    throw new Error('Can not delMin(), the queue is empty.');
  }

  const s = this.s;
  const min = s[1];

  exch(s, 1, n--);

  this.n = n;
  this.sink(1);
  s.length = n + 1;

  delete this.keys[min.key];

  return min;
};

PQ.prototype.swim = function(k) {
  if (k <= 1) return;

  const p = Math.floor(k / 2);
  const s = this.s;

  if (s[k].key < s[p].key) {
    exch(s, k, p);
    this.swim(p);
  }
};

PQ.prototype.sink = function(k) {
  const s = this.s;

  while(2 * k <= this.n) {
    let j = 2 * k;
    if (j < this.n && s[j].key > s[j+1].key) {
      j++;
    }
    if (s[k].key <= s[j].key) break;
    exch(s, k, j);
    k = j;
  }
}

PQ.prototype.contains = function(key) {
  return !!this.keys[key];
}

module.exports = PQ;

// const pq = new PQ();
//
// pq.add(3, 'three');
// pq.add(1, 'one');
// pq.add(4, 'four');
// pq.add(2, 'two');
// pq.add(5, 'five');
// pq.add(6, 'six');
//
// console.log(pq);
//
// pq.delMin();
// console.log(pq);
// pq.delMin();
// console.log(pq);
// pq.delMin();
// console.log(pq);
// pq.delMin();
// console.log(pq);
// pq.delMin();
// console.log(pq);
