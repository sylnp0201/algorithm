'use strict';

function Edge(from, to, weight) {
  this.from = from;
  this.to = to;
  this.weight = weight;
}

function Graph(V) {
  this.vertices = new Array(V);
  for (let i = 0; i < V; i++) {
    this.vertices[i] = [];
  }
}

Graph.prototype.V = function() {
  return this.vertices.length;
}

Graph.prototype.addEdge = function(from, to, weight) {
  const edge = new Edge(from ,to, weight);
  this.vertices[from].push(edge);
}


Graph.prototype.adj = function(v) {
  return this.vertices[v];
}

module.exports = Graph;

// test code

// const g = new Graph(9);
// g.addEdge(0, 1, 5);
// g.addEdge(0, 3, 1);
// g.addEdge(1, 2, 1);
// g.addEdge(1, 4, 2);
// g.addEdge(2, 5, 1);
// g.addEdge(3, 4, 2);
// g.addEdge(3, 6, 1);
// g.addEdge(4, 5, 2);
// g.addEdge(4, 7, 1);
// g.addEdge(5, 8, 2);
// g.addEdge(6, 7, 2);
// g.addEdge(7, 8, 4);
//
// g.vertices.forEach((edges) => {
//   edges.forEach((edge) => {
//     console.log(edge);
//   });
// })
