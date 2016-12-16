'use strict';

const PQ = require('./data-structure/priority-queue');
const Graph = require('./data-structure/weighted-digraph');

const dist = (i, j) => {
  if (i === 0 && j === 1) return 5;
  if (i === 0 && j === 3) return 1;
  if (i === 1 && j === 2) return 1;
  if (i === 1 && j === 4) return 2;
  if (i === 2 && j === 5) return 1;
  if (i === 3 && j === 4) return 2;
  if (i === 3 && j === 6) return 1;
  if (i === 4 && j === 5) return 2;
  if (i === 4 && j === 7) return 1;
  if (i === 5 && j === 8) return 2;
  if (i === 6 && j === 7) return 2;
  if (i === 7 && j === 8) return 4;
};

const heuristicDistToGoal = (i) => {
  switch(i) {
    case 0:
      return 4;
    case 1:
      return 3;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 2;
    case 5:
      return 1;
    case 6:
      return 2;
    case 7:
      return 1;
    case 8:
      return 0;
  }
};

function aStar(graph, start, goal) {
  const closedSet = [];
  const cameFrom = {};

  const gScore = graph.vertices.map(() => Number.POSITIVE_INFINITY);
  gScore[start] = 0;

  const fScore = gScore.slice(0);
  fScore[start] = 5;

  const openSet = new PQ();
  openSet.add(fScore[start], start)

  while(!openSet.isEmpty()) {
    const current = openSet.delMin().value;

    if (current === goal) {
      return construct_path(cameFrom, current);
    }

    closedSet[current] = true;

    const neighbors = graph.adj(current).map(n => n.to);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (closedSet[neighbor]) {
        continue;
      }

      const tentativeGScore = gScore[current] + dist(current, neighbor);

      if (!openSet.contains(neighbor)) {
        openSet.add(tentativeGScore, neighbor);
      } else if (tentativeGScore >= gScore[neighbor]) {
        continue;
      }

      cameFrom[neighbor] = current;
      gScore[neighbor] = tentativeGScore;
      fScore[neighbor] = tentativeGScore + heuristicDistToGoal(neighbor);
    }
  }
}

function construct_path(cameFrom, current) {
  const path = [current];
  let i = current;

  while(cameFrom[i] !== undefined) {
    path.unshift(cameFrom[i]);
    i = cameFrom[i];
  }

  return path;
}

const g = new Graph(9);

function addEdge(g, i, j) {
  g.addEdge(i, j, dist(i, j));
}

addEdge(g, 0, 1);
addEdge(g, 0, 3);
addEdge(g, 1, 2);
addEdge(g, 1, 4);
addEdge(g, 2, 5);
addEdge(g, 3, 4);
addEdge(g, 3, 6);
addEdge(g, 4, 5);
addEdge(g, 4, 7);
addEdge(g, 5, 8);
addEdge(g, 6, 7);
addEdge(g, 7, 8);

const path = aStar(g, 0, 8);
console.log('path', path); // should be 0->3->4->5->8
