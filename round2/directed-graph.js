'use strict';

class DirectedGraph {
  constructor(V) {
    this.V = V;
    this.vertices = new Array(V);

    for (let i = 0; i < V; i++) {
      this.vertices[i] = [];
    }
  }

  addEdge(from, to) {
    this.vertices[from].push(to);
  }

  adj(v) {
    return this.vertices[v];
  }
}

// module.exports = DirectedGraph;

// TEST CODE

const g = new DirectedGraph(12);
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

module.exports = g;

// g.vertices.forEach((tos, i) => {
//   process.stdout.write(`${i} => `);
//   tos.forEach((to) => {
//     process.stdout.write(`${to} `);
//   });
//   process.stdout.write("\n");
// })
