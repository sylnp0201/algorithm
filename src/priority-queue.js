'use strict';

const exch = require('utils/exch');

// MinPQ
function PQ() {
  this.s = [null];
  this.n = 0; // the length of the queue
}

PQ.prototype.add = function(key) {
  let n = this.n;

  this.s[++n] = key;
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

  return min;
};

PQ.prototype.swim = function(k) {
  if (k <= 1) return;

  const p = Math.floor(k / 2);
  const s = this.s;

  if (s[k] < s[p]) {
    exch(s, k, p);
    this.swim(p);
  }
};

PQ.prototype.sink = function(k) {
  const s = this.s;

  while(2 * k <= this.n) {
    let j = 2 * k;
    if (j < this.n && s[j] > s[j+1]) {
      j++;
    }
    if (s[k] <= s[j]) break;
    exch(s, k, j);
    k = j;
  }
}

// const pq = new PQ();
//
// pq.add(3);
// pq.add(1);
// pq.add(4);
// pq.add(2);
// pq.add(5);
// pq.add(6);
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
