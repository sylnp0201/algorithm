// 'use strict';
//
const Benchmark = require('benchmark');
const isSorted = require('utils/is-sorted');
const randomArray = require('utils/random-array');

const qsort = require('quick-sort');
const hqsort = require('hybrid-quick-sort');
const msort = require('merge-sort');
const isort = require('insertion-sort');

const array = randomArray(1e4);

const suite = new Benchmark.Suite;

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

suite
  .add('qsort', () => {
    qsort(array);
  })
  .add('hqsort', () => {
    hqsort(array);
  })
  .add('msort', () => {
    msort(array);
  })
  .add('isort', () => {
    isort(array);
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });
