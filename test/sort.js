'use strict';

const benchmark = require('./benchmark');
const isSorted = require('utils/is-sorted');
const randomArray = require('utils/random-array');

const qsort = require('quick-sort');
const hqsort = require('hybrid-quick-sort');
const msort = require('merge-sort');
const isort = require('insertion-sort');
const bstsort = require('bst-sort');

const N = parseInt(process.env.SIZE, 10) || 1e5;

let array = randomArray(N);

if (!isSorted(qsort(array))) {
  throw new Error('qsort shits herself');
}

if (!isSorted(hqsort(array))) {
  throw new Error('hqsort shits herself');
}

if (!isSorted(msort(array))) {
  throw new Error('msort shits herself');
}

if (!isSorted(bstsort(array))) {
  throw new Error('bstsort shits herself');
}

const setup = () => array = randomArray(N);

benchmark('Array.sort', () => { array.sort(); }, setup);
benchmark('qsort', () => { qsort(array); }, setup);
benchmark('hqsort', () => { hqsort(array); }, setup);
benchmark('msort', () => { msort(array); }, setup);
benchmark('bstsort', () => { bstsort(array); }, setup);

if (N <= 1e5) {
  if (!isSorted(isort(array))) {
    throw new Error('isort shits herself');
  }

  benchmark('isort', () => { isort(array); }, setup);
}
