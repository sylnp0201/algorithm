'use strict';

const Graph = require('data-structure/undirected-graph');
const Queue = require('data-structure/queue');

function isNull(obj) {
  return obj === null || obj === undefined;
}

class BFS {
  constructor(graph, s) {
    this.graph = graph;
    this.s = s;

    const v = graph.V();
    this.marked = new Array(v);
    this.pathFrom = new Array(v);

    this.search(s);
  }

  search(s) {
    const marked = this.marked;
    const pathFrom = this.pathFrom;
    const graph = this.graph;
    const queue = new Queue();
    queue.push(s);
    marked[s] = true;

    while(!queue.isEmpty()) {
      const current = queue.pop();

      for (let neighbor of graph.adj(current)) {
        if (!marked[neighbor]) {
          queue.push(neighbor);
          marked[neighbor] = true;
          pathFrom[neighbor] = current;
        }
      }
    }
  }

  hasPathTo(p) {
    return !!this.marked[p];
  }

  pathTo(p) {
    if (!this.hasPathTo(p)) return null;

    let current = p;
    const path = [current];

    while(!isNull(this.pathFrom[current])) {
      const from = this.pathFrom[current];
      path.unshift(from);
      current = from;
    }

    return path;
  }
}

// TEST CODE
// const graph = new Graph(11);
//
// graph.addEdge(0, 1);
// graph.addEdge(0, 2);
// graph.addEdge(1, 3);
// graph.addEdge(2, 3);
// graph.addEdge(2, 6);
// graph.addEdge(3, 4);
// graph.addEdge(4, 5);
// graph.addEdge(4, 6);
// graph.addEdge(4, 9);
// graph.addEdge(5, 6);
// graph.addEdge(5, 7);
// graph.addEdge(5, 8);
// graph.addEdge(6, 7);
// graph.addEdge(6, 10);
// graph.addEdge(7, 8);
// graph.addEdge(8, 9);
// graph.addEdge(9, 10);
//
// const bfs = new BFS(graph, 0);
//
// console.log(bfs.hasPathTo(6)); // true
// console.log(bfs.pathTo(10)); // [0, 2, 6, 10]
// console.log(bfs.pathTo(8)); // [0, 2, 6, 5, 8]
