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

module.exports = Graph;
