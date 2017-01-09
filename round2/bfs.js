'use strict';

const Queue = require('./queue');

class BFS {
  constructor(graph, s) {
    this.s = s;
    this.graph = graph;
    this.q = new Queue();

    const v = this.graph.V();

    this.marked = (new Array(v)).fill(false);
    this.pathFrom = (new Array(v)).fill(null);

    this.search(s);
  }

  search(s) {
    const q = this.q;

    q.enqueue(s);
    this.marked[s] = true;

    while(!q.isEmpty()) {
      const current = q.dequeue();

      for (const p of this.graph.adj(current)) {
        if (!this.marked[p]) {
          this.marked[p] = true;
          this.pathFrom[p] = current;
          q.enqueue(p);
        }
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

module.exports = BFS;

const g = require('./graph')();
const bfs = new BFS(g, 0);
console.log(bfs.hasPathTo(9));
console.log(bfs.hasPathTo(8));
console.log(bfs.hasPathTo(2));
console.log(bfs.pathTo(9));
console.log(bfs.pathTo(2));
