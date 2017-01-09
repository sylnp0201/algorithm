'use strict';

class DFS {
  constructor(graph, s) {
    this.s = s;
    this.graph = graph;

    const v = this.graph.V();

    this.marked = (new Array(v)).fill(false);
    this.pathFrom = (new Array(v)).fill(null);

    this.search(s);
  }

  search(s) {
    this.marked[s] = true;

    for (const n of this.graph.adj(s)) {
      if (!this.marked[n]) {
        this.search(n);
        this.pathFrom[n] = s;
      }
    }
  }

  hasPathTo(d) {
    return this.marked[d];
  }

  pathTo(d) {
    if (!this.hasPathTo(d)) return null;

    let current = d;
    const result = [];

    while(current !== null) {
      result.unshift(current);
      current = this.pathFrom[current];
    }

    return result;
  }
}

module.exports = DFS;

const g = require('./graph')();
const dfs = new DFS(g, 0);
console.log(dfs.hasPathTo(9));
console.log(dfs.hasPathTo(8));
console.log(dfs.hasPathTo(2));
console.log(dfs.pathTo(9));
console.log(dfs.pathTo(2));
