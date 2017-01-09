'use strict';

const assert = require('assert');

/**
 * @constructor
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
  if (matrix.length < 1 || matrix[0].length < 1) {
    return;
  }

  this.matrix = matrix;
  const m = matrix.length;
  const n = matrix[0].length;

  for (let i = 0; i < m; i++) {
    let rowsum = 0;
    const row = matrix[i];
    for (let j = 0; j < n; j++) {
      row[j] = row[j] + rowsum;
      rowsum = row[j];
    }
  }
};

/**
 * @param {number} row
 * @param {number} col
 * @param {number} val
 * @return {void}
 */
NumMatrix.prototype.update = function(row, col, val) {
  const r = this.matrix[row];
  const orig = col === 0 ? r[col] : r[col] - r[col-1];
  const diff = val - orig;

  for (let i = col; i < r.length; i++) {
    r[i] += diff;
  }

  return this;
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  let sum = 0;
  for (let i = row1; i <= row2; i++) {
    const row = this.matrix[i];
    sum += row[col2] - (col1 === 0 ? 0 : row[col1-1]);
  }
  return sum;
};


/**
 * Your NumMatrix object will be instantiated and called as such:
 * var numMatrix = new NumMatrix(matrix);
 * numMatrix.sumRegion(0, 1, 2, 3);
 * numMatrix.update(1, 1, 10);
 * numMatrix.sumRegion(1, 2, 3, 4);
 */

let matrix = [
 [3, 0, 1, 4, 2],
 [5, 6, 3, 2, 1],
 [1, 2, 0, 1, 5],
 [4, 1, 0, 1, 7],
 [1, 0, 3, 0, 5]
];

const numMatrix = new NumMatrix(matrix);

assert.equal(numMatrix.sumRegion(2, 1, 4, 3), 8);
numMatrix.update(3, 2, 2)
assert.equal(numMatrix.sumRegion(2, 1, 4, 3), 10);
