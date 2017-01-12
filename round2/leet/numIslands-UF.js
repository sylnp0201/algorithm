'use strict';

const assert = require('assert');

/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
var numIslands2 = function(m, n, positions) {
  const size = m * n;
  const counts = [];
  const uf = [];

  // uf lists
  const parent = new Array(size);
  const weight = new Array(size);
  const terr = new Array(size);

  for (let i = 0; i < size; i++) {
    parent[i] = i;
    weight[i] = 0;
    terr[i] = false; // true - land, false - water
  }

  let count = 0;

  function findRoot(i) {
    while(parent[i] !== i) {
      i = parent[i];
    }
    return i;
  }

  function union(x, y) {
    const r1 = findRoot(x);
    const r2 = findRoot(y);

    if (r1 === r2) {
      return;
    }

    if (weight[r1] < weight[r2]) {
      parent[r1] = r2;
      weight[r2] += weight[r1];
    } else {
      parent[r2] = r1;
      weight[r1] += weight[r2];
    }

    count--;
  }

  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const idx = pos[0] * n + pos[1];

    if (idx < 0 || idx >= size) { // invalid position
      counts.push(count);
      continue;
    }

    count++;

    terr[idx] = true;

    if (pos[1] !== n - 1 && terr[idx+1]) {
      union(idx, idx+1);
      // console.log('union right', count);
    }

    if (pos[1] !== 0 && terr[idx-1]) {
      union(idx, idx-1);
      // console.log('union left', count);
    }

    if (pos[0] !== m - 1 && terr[idx+n]) {
      union(idx, idx+n);
      // console.log('union down', count);
    }

    if (pos[0] !== 0 && terr[idx-n]) {
      union(idx, idx-n);
      // console.log('union up', count);
    }

    counts.push(count);
  }

  return counts;
};

assert.deepEqual(numIslands2(3, 3, [[0,0], [0,1], [1,2], [2,1]]), [1, 1, 2, 3]);
assert.deepEqual(numIslands2(2, 2, [[0,0], [1,1], [0,1]]), [1, 2, 1]);
assert.deepEqual(
  numIslands2(3, 3, [[0,1],[1,2],[2,1],[1,0],[0,2],[0,0],[1,1]]),
  [1,2,3,4,3,2,1]
);
