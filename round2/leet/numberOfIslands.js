'use strict';

const assert = require('assert');

const ISLAND = '1';
const WATER = '0';

class Graph {
  constructor(grid) {
    this.R = grid.length;
    this.C = grid[0].length;

    this.size = this.R * this.C;

    this.nodes = new Array(this.R * this.C);

    for (let i = 0; i < this.size; i++) {
      this.nodes[i] = [];
    }

    for (let i = 0; i < this.size; i++) {
      const row = Math.floor(i / this.C);
      const col = i % this.C;

      if (row !== this.R - 1) {
        const idxdown = (row + 1) * this.C + col;

        if (grid[row][col] === ISLAND && grid[row+1][col] === ISLAND) {
          this.nodes[i].push(idxdown);
          this.nodes[idxdown].push(i);
        }
      }

      if (col !== this.C - 1) {
        const idxright = i + 1;
        if (grid[row][col] === ISLAND && grid[row][col+1] === ISLAND) {
          this.nodes[i].push(idxright);
          this.nodes[idxright].push(i);
        }
      }
    }
    // console.log(this.nodes);
  }

  adj(i) {
    return this.nodes[i];
  }
}

function dfs(graph, i, marked) {
  marked[i] = true;

  for (const p of graph.adj(i)) {
    if (!marked[p]) {
      dfs(graph, p, marked);
    }
  }
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  if (grid.length < 1 || grid[0].length < 1) {
    return 0;
  }

  const g = new Graph(grid);
  const C = g.C;
  const R = g.R;

  let count = 0;
  const marked = new Array(g.size).fill(false);

  for (let i = 0; i < g.size; i++) {
    const row = Math.floor(i / C);
    const col = i % C;
    if (grid[row][col] === ISLAND && !marked[i]) {
      dfs(g, i, marked);
      count++;
    }
  }

  return count;
}

assert.equal(numIslands([
  ['1','1','1','1','0'],
  ['1','1','0','1','0'],
  ['1','1','0','0','0'],
  ['0','0','0','0','0']
]), 1);

assert.equal(numIslands([
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
]), 3);
