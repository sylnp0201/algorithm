'use strict';

const Stack = require('data-structure/stack');
const Graph = require('data-structure/weighted-digraph');

class Topological {
  constructor(graph) {
    this.graph = graph;
    this.marked = [];
    this.reversedPost = new Stack();

    this.sort();
  }

  sort() {
    const n = this.graph.V();

    for (let i = 0; i < n; i++) {
      if (!this.marked[i]) {
        this.dfs(i);
      }
    }
  }

  dfs(i) {
    const marked = this.marked;
    const graph = this.graph;
    marked[i] = true;
    for (const edge of graph.adj(i)) {
      const k = edge.to;
      if (!marked[k]) {
        this.dfs(k);
      }
    }
    this.reversedPost.push(i);
  }

  order() {
    return this.reversedPost;
  }
}

module.exports = Topological;

// TEST CODE
// const graph = new Graph(7);
//
// graph.addEdge(0, 1);
// graph.addEdge(0, 2);
// graph.addEdge(0, 5);
// graph.addEdge(1, 4);
// graph.addEdge(3, 2);
// graph.addEdge(3, 4);
// graph.addEdge(3, 5);
// graph.addEdge(3, 6);
// graph.addEdge(5, 2);
// graph.addEdge(6, 0);
// graph.addEdge(6, 4);
//
// const topo = new Topological(graph);
// const order = topo.order();
// for (const i of order) {
//   console.log(i); // 3 -> 6 -> 0 -> 5 -> 2 -> 1 -> 4
// }
