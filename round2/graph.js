'use strict';

function Graph(V) {
  this.vertices = new Array(V);
  for (let i = 0; i < V; i++) {
    this.vertices[i] = [];
  }
}

Graph.prototype.V = function() {
  return this.vertices.length;
}

Graph.prototype.addEdge = function(from, to) {
  this.vertices[from].push(to);
  this.vertices[to].push(from);
}

Graph.prototype.adj = function(v) {
  return this.vertices[v];
}

function graphBuilder() {
  const graph = new Graph(10);

  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 5);
  graph.addEdge(2, 4);
  graph.addEdge(5, 3);
  graph.addEdge(3, 4);
  graph.addEdge(4, 9);
  graph.addEdge(6, 7);
  graph.addEdge(7, 8);

  return graph;
}

module.exports = graphBuilder;
