'use strict';

const assert = require('assert');
const Queue = require('./queue');

class Graph {
  constructor(V) {
    this.nodes = {};
    this.V = V;
  }

  addEdge(from, to) {
    let fromnode = this.nodes[from];
    let tonode = this.nodes[to];

    if (!fromnode) {
      this.nodes[from] = [];
    }

    if (!tonode) {
      this.nodes[to] = [];
    }

    this.nodes[from].push(to);
  }

  adj(p) {
    return this.nodes[p];
  }
}

// TEST CODE
const g = new Graph(12);
g.addEdge(0, 1);
g.addEdge(0, 3);
g.addEdge(1, 2);
g.addEdge(1, 4);
g.addEdge(2, 5);
g.addEdge(3, 4);
g.addEdge(3, 6);
g.addEdge(4, 5);
g.addEdge(4, 7);
g.addEdge(5, 8);
g.addEdge(6, 7);
g.addEdge(7, 8);
g.addEdge(9, 10);
g.addEdge(10, 11);
g.addEdge(11, 10);

assert.deepEqual(g.adj(0), [1, 3]);
assert.deepEqual(g.adj(4), [5, 7]);
assert.deepEqual(g.adj(8), []);
assert.deepEqual(g.adj(11), [10]);

class DFS {
  constructor(graph, s) {
    this.marked = {};
    this.pathFrom = {};
    this.graph = graph;
    this.s = s;

    this.search(s);
  }

  search(s) {
    this.marked[s] = true;

    for (const p of this.graph.adj(s)) {
      if (!this.marked[p]) {
        this.pathFrom[p] = s;
        this.search(p);
      }
    }
  }

  hasPathTo(to) {
    return !!this.marked[to];
  }

  pathTo(to) {
    if (!this.hasPathTo(to)) {
      return null;
    }

    const path = [];

    let current = to;

    while(current !== null && current !== undefined) {
      path.unshift(current);
      current = this.pathFrom[current];
    }

    return path;
  }
}

const dfs = new DFS(g, 0);

assert(dfs.hasPathTo(8));
assert.deepEqual(dfs.pathTo(8), [0,1,2,5,8]);

class BFS {
  constructor(graph, s) {
    this.marked = {};
    this.pathFrom = {};
    this.graph = graph;
    this.s = s;
    this.q = new Queue();

    this.search(s);
  }

  search(s) {
    const q = this.q;

    q.enqueue(s);
    this.marked[s] = true;
    this.pathFrom[s] = null;

    while(!q.isEmpty()) {
      const current = q.dequeue();

      for (const p of this.graph.adj(current)) {
        if (!this.marked[p]) {
          q.enqueue(p);
          this.marked[p] = true;
          this.pathFrom[p] = current;
        }
      }
    }
  }

  hasPathTo(to) {
    return !!this.marked[to];
  }

  pathTo(to) {
    if (!this.hasPathTo(to)) {
      return null;
    }

    const path = [];

    let current = to;

    while(current !== null && current !== undefined) {
      path.unshift(current);
      current = this.pathFrom[current];
    }

    return path;
  }
}

const g2 = new Graph(8);
g2.addEdge('A', 'B');
g2.addEdge('A', 'C');
g2.addEdge('C', 'D');
g2.addEdge('D', 'E');
g2.addEdge('D', 'F');
g2.addEdge('E', 'G');
g2.addEdge('G', 'H');
g2.addEdge('F', 'H');

const bfs = new BFS(g2, 'C');

assert(bfs.hasPathTo('H'));
assert(!bfs.hasPathTo('B'));
assert.deepEqual(bfs.pathTo('H'), [ 'C', 'D', 'F', 'H' ]);
