'use strict';

const assert = require('assert');
const NOT_FOUND = -1;
const EMPTY = 0;
const BUILDING = 1;
const OBSTACLE = 2;

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestDistance = function(grid) {
  const N = grid.length;
  const M = grid[0].length;

  if (N < 2 && M < 2) {
    return NOT_FOUND;
  }

  const size = M * N;

  const buildings = [];
  const empties = [];
  const dists = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (grid[i][j] !== BUILDING) {
        if (grid[i][j] === EMPTY) {
          empties.push([i, j]);
        }
        continue;
      }
      buildings.push([i, j]);
      const q = [[i, j]];
      const dl = new Array(N);

      for (let k = 0; k < N; k++) {
        dl[k] = (new Array(M)).fill(-1);
      }

      dl[i][j] = 0;

      while(q.length > 0) {
        const cur = q.shift();
        const u = cur[0];
        const v = cur[1];
        if (u !== 0 && grid[u-1][v] === EMPTY && dl[u-1][v] < 0) {
          q.push([u-1, v]);
          dl[u-1][v] = dl[u][v] + 1;
        }
        if (u !== N - 1 && grid[u+1][v] === EMPTY && dl[u+1][v] < 0) {
          q.push([u+1, v]);
          dl[u+1][v] = dl[u][v] + 1;
        }
        if (v !== 0 && grid[u][v-1] === EMPTY && dl[u][v-1] < 0) {
          q.push([u, v-1]);
          dl[u][v-1] = dl[u][v] + 1;
        }
        if (v !== M - 1 && grid[u][v+1] === EMPTY && dl[u][v+1] < 0) {
          q.push([u, v+1]);
          dl[u][v+1] = dl[u][v] + 1;
        }
      }
      dists.push(dl);
    }
  }

  let shortest = Number.POSITIVE_INFINITY;

  for (let i = 0; i < empties.length; i++) {
    const empty = empties[i];
    const u = empty[0];
    const v = empty[1];
    let sum = 0;
    for (let j = 0; j < buildings.length; j++) {
      const b = buildings[j];
      const dist = dists[j][u][v];
      if (dist <= 0) {
        sum = 0;
        break;
      }
      sum += dist;
    }

    if (sum > 0) {
      shortest = Math.min(sum, shortest);
    }
  }

  if (shortest === Number.POSITIVE_INFINITY) {
    return NOT_FOUND;
  }

  return shortest
};

assert.equal(shortestDistance([
  [1,0,2,0,1],
  [0,0,0,0,0],
  [0,0,1,0,0]
]), 7);
assert.equal(shortestDistance([
  [0,2,1],
  [1,0,2],
  [0,1,0]
]), -1);
assert.equal(shortestDistance([
  [1,1],
  [0,1]
]), -1);
assert.equal(shortestDistance([
  [1,1,1,1,1,0],
  [0,0,0,0,0,1],
  [0,1,1,0,0,1],
  [1,0,0,1,0,1],
  [1,0,1,0,0,1],
  [1,0,0,0,0,1],
  [0,1,1,1,1,0]
]), 88);
assert.equal(shortestDistance([
  [0,0,0,0,2,2,0],
  [2,0,2,0,0,2,2],
  [0,2,0,0,0,0,0],
  [2,2,0,2,0,0,0],
  [0,0,0,2,2,2,0],
  [0,0,0,0,2,2,0],
  [2,0,0,0,0,0,0],
  [0,0,0,0,2,2,2],
  [0,2,0,0,0,2,2],
  [2,2,2,2,0,0,0],
  [2,0,2,0,2,2,2],
  [0,2,2,0,0,0,0],
  [2,2,0,2,0,0,2],
  [0,2,0,0,0,0,2],
  [0,2,0,0,0,0,2],
  [0,0,2,0,2,0,0],
  [2,2,2,0,2,0,0],
  [2,0,0,2,2,2,0],
  [0,0,0,0,2,1,0],
  [2,0,0,0,0,0,2],
  [0,0,2,0,0,0,2],
  [0,0,0,0,0,0,0],
  [2,0,0,0,0,2,0],
  [2,2,0,0,2,2,0],
  [2,0,0,2,2,2,0],
  [0,0,0,0,2,0,0],
  [0,0,0,2,1,0,0],
  [0,0,0,0,0,2,0],
  [0,2,2,0,1,2,0],
  [1,0,0,2,2,0,0],
  [0,2,2,2,1,2,0],
  [2,0,0,0,2,2,2],
  [0,2,2,2,2,2,0],
  [0,2,2,2,0,2,2],
  [2,0,0,0,0,2,0],
  [0,2,1,0,0,0,2],
  [0,2,0,0,2,2,0],
  [0,2,2,0,0,0,2],
  [0,0,0,0,2,0,0],
  [0,0,0,0,0,0,0],
  [2,0,0,2,0,0,2],
  [2,2,2,0,2,1,0],
  [0,2,0,0,2,0,0],
  [0,2,0,0,2,2,0],
  [2,0,0,0,0,2,0],
  [2,0,0,0,2,0,2],
  [2,2,0,2,2,0,2],
  [2,2,0,1,0,0,1],
  [0,0,0,0,0,2,2],
  [0,0,2,0,0,0,1],
  [2,2,0,2,2,0,2]]), -1);
