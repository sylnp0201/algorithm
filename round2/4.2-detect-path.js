'use strict';

const graph = require('./directed-graph');
const Queue = require('./queue');

function detect(graph, start, end) {
  const marked = (new Array(graph.V)).fill(false);
  const q = new Queue();

  marked[start] = true;
  q.enqueue(start);

  while(!q.isEmpty()) {
    const current = q.dequeue();

    for (const p of graph.adj(current)) {
      if (p === end) {
        return true;
      }

      if (!marked[p]) {
        marked[p] = true;
        q.enqueue(p);
      }
    }
  }

  return false;
}

// console.log(detect(graph, 0, 8)); // true
// console.log(detect(graph, 3, 7)); // true
// console.log(detect(graph, 2, 8)); // true
// console.log(detect(graph, 9, 10)); // true
// console.log(detect(graph, 11, 10)); // true
//
// console.log(detect(graph, 8, 0)); // false
// console.log(detect(graph, 0, 10)); // false
