'use strict';

const assert = require('assert');

class Graph {
  constructor(matrix) {
    this.r = matrix.length;
    this.c = matrix[0].length;
    this.pacific = this.r * this.c;
    this.atlantic = this.r * this.c + 1;

    const size = this.r * this.c;
    this.size = size;

    this.nodes = new Array(size + 2);

    for (let i = 0; i < size + 2; i++) {
      this.nodes[i] = [];
    }

    for (let i = 0; i < size; i++) {
      const row = Math.floor(i / this.c);
      const col = i % this.c;

      // tile below
      if (row < this.r - 1) {
        const downidx = (row + 1) * this.c + col;

        if (matrix[row][col] >= matrix[row + 1][col]) {
          this.nodes[downidx].push(i);
        }
        if (matrix[row][col] <= matrix[row + 1][col]) {
          this.nodes[i].push(downidx);
        }
      }

      // tile right
      if (col < this.c - 1) {
        const rightidx = row * this.c + col + 1;

        if (matrix[row][col] >= matrix[row][col + 1]) {
          this.nodes[rightidx].push(i);
        }
        if (matrix[row][col] <= matrix[row][col + 1]) {
          this.nodes[i].push(rightidx);
        }
      }

      if (row === 0 || col === 0) {
        this.nodes[this.pacific].push(i);
      }
      if (row === this.r - 1 || col === this.c - 1) {
        this.nodes[this.atlantic].push(i);
      }
    }
  }

  adj(i) {
    return this.nodes[i];
  }
}

class DFS {
  constructor(graph, source) {
    this.graph = graph;
    this.s = source;
    this.marked = (new Array(graph.size)).fill(false);

    this.search(source);
  }

  search(node) {
    this.marked[node] = true;

    for (const neighbor of this.graph.adj(node)) {
      if (!this.marked[neighbor]) {
        this.search(neighbor);
      }
    }
  }

  hasPathTo(dest) {
    return this.marked[dest];
  }
}

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var pacificAtlantic = function(matrix) {
  if (matrix.length < 1 || matrix[0].length < 1) {
    return [];
  }

  const g = new Graph(matrix);
  const r = matrix.length;
  const c = matrix[0].length;
  const result = [];

  const dfsAt = new DFS(g, g.atlantic);
  const dfsPa = new DFS(g, g.pacific);

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      const idx = i * c + j;

      if (dfsAt.hasPathTo(idx) && dfsPa.hasPathTo(idx)) {
        result.push([i, j]);
      }
    }
  }

  return result;
};

const g = [
  [1,2,2,3,5],
  [3,2,3,4,4],
  [2,4,5,3,1],
  [6,7,1,4,5],
  [5,1,1,2,4]
];

// // const g = [
// //   [1,2,3],
// //   [3,2,3]
// // ];
// console.log(pacificAtlantic(g));


assert.deepEqual(pacificAtlantic(g), [
  [0, 4], [1, 3], [1, 4],[2, 2], [3, 0], [3, 1], [4, 0]
]);
