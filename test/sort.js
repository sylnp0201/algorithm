'use strict';

const TYPE = process.env.TYPE || 'number';

const benchmark = require('./benchmark');
const isSorted = require('utils/is-sorted');
const randomArray = require('utils/random-array')[TYPE];

const qsort = require('quick-sort');
const hqsort = require('hybrid-quick-sort');
const msort = require('merge-sort');
const isort = require('insertion-sort');
const bstsort = require('bst-sort');

const N = parseInt(process.env.SIZE, 10) || 1e5;

const assertSorted = (fn) => {
  const array = randomArray(N);
  if (!isSorted(fn(array))) {
    throw new Error(`${fn.name} shits herself`);
  }
}

assertSorted(qsort);
assertSorted(hqsort);
assertSorted(msort);
assertSorted(bstsort);

let array = randomArray(N);
const setup = () => { array = randomArray(N); };

benchmark('Array.sort', () => { array.sort(); }, setup);
benchmark('qsort', () => { qsort(array); }, setup);
benchmark('hqsort', () => { hqsort(array); }, setup);
benchmark('msort', () => { msort(array); }, setup);
benchmark('bstsort', () => { bstsort(array); }, setup);

if (N <= 1e4) {
  assertSorted(isort);

  benchmark('isort', () => { isort(array); }, setup);
}

if (TYPE === 'string') {
  const lsdsort = require('lsd-sort');

  assertSorted(lsdsort);

  benchmark('lsdsort', () => { lsdsort(array); }, setup);
}
