'use strict';

function matrixFun(matrix) {
  const n = matrix.length;
  const m = matrix[0].length;

  const rows = (new Array(n)).fill(false);
  const cols = (new Array(m)).fill(false);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 0) {
        rows[i] = true;
        cols[j] = true;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (rows[i] || cols[j]) {
        matrix[i][j] = 0;
      }
    }
  }

  return matrix;
}


// TEST CODE
console.log(matrixFun([[0]]));
console.log(matrixFun([[0, 1], [2, 3]]));
console.log(matrixFun([[0, 1, 1], [1, 1, 1], [1, 1, 0]]));
