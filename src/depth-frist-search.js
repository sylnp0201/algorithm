'use strict';

const Graph = require('data-structure/undirected-graph');

/* G - Graph, s - source */
function DFS(G, s) {
  this.G = G;
  this.s = s;
  this.marked = new Array(G.V());
  this.pathFrom = new Array(G.V());

  this.search(s);
}

DFS.prototype.search = function(s) {
  const G = this.G;
  this.marked[s] = true;

  for (const p of G.adj(s)) {
    if (!this.marked[p]) {
      this.search(p);
      this.pathFrom[p] = s;
    }
  }
}

DFS.prototype.hasPathTo = function(p) {
  return !!this.marked[p];
};

DFS.prototype.pathTo = function(p) {
  if (!this.hasPathTo(p)) return null;

  let current = p;
  const path = [current];

  while(this.pathFrom[current]) {
    const from = this.pathFrom[current];
    path.unshift(from);
    current = from;
  }

  return path;
}

module.exports = DFS;

// TEST CODE
// const graph = new Graph(10);
//
// graph.addEdge(5, 3);
// graph.addEdge(5, 8);
// graph.addEdge(3, 2);
// graph.addEdge(3, 4);
// graph.addEdge(2, 1);
// graph.addEdge(8, 9);
// graph.addEdge(8, 7);
// graph.addEdge(7, 6);
//
// const dfs = new DFS(graph, 5);
//
// console.log(dfs.hasPathTo(6)); // true
// console.log(dfs.pathTo(6)); // [5, 8, 7, 6]
