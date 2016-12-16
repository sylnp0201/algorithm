'use strict';

const benchmark = require('./benchmark');
const isSorted = require('utils/is-sorted');
const randomArray = require('utils/random-array');

const qsort = require('quick-sort');
const hqsort = require('hybrid-quick-sort');
const msort = require('merge-sort');
const isort = require('insertion-sort');

const N = 1e6;

let array = randomArray(N);

if (!isSorted(qsort(array))) {
  throw new Error('qsort shits her self');
}

if (!isSorted(hqsort(array))) {
  throw new Error('hqsort shits her self');
}

if (!isSorted(msort(array))) {
  throw new Error('msort shits her self');
}

if (!isSorted(isort(array))) {
  throw new Error('isort shits her self');
}

const setup = () => array = randomArray(N);

benchmark('Array.sort', () => { array.sort(); }, setup);
benchmark('qsort', () => { qsort(array); }, setup);
benchmark('hqsort', () => { hqsort(array); }, setup);
benchmark('msort', () => { msort(array); }, setup);

if (N <= 1e5) {
  benchmark('isort', () => { isort(array); }, setup);
}
