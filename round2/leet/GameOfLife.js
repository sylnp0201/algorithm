'use strict';

const assert = require('assert');

var gameOfLife = function(board) {
  const n = board.length;
  if (n < 0) return;
  const m = board[0].length;
  if (m < 0) return;

  function getScore(i, j) {
    let s = 0;
    for (let x = Math.max(i-1, 0); x <= Math.min(i+1, n-1); x++) {
      for (let y = Math.max(j-1, 0); y <= Math.min(j+1, m-1); y++) {
        if (board[x][y] & 1) {
          s++;
        }
      }
    }
    s -= board[i][j] & 1;
    return s;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const score = getScore(i, j);
      if (board[i][j] & 1) {
        // current live
        if (score > 1 && score < 4) {
          board[i][j] |= 1 << 1;
        }
      } else {
        // current dead
        if (score === 3) {
          board[i][j] |= 1 << 1;
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      board[i][j] = board[i][j] >> 1;
    }
  }
};

let b;

b = [[]];
gameOfLife(b);
assert.deepEqual(b, [[]]);

b = [[1]];
gameOfLife(b);
assert.deepEqual(b, [[0]]);

b = [[0]];
gameOfLife(b);
assert.deepEqual(b, [[0]]);

b = [[1,1],[1,0]];
gameOfLife(b);
assert.deepEqual(b, [[1,1],[1,1]]);

b = [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]];
gameOfLife(b);
assert.deepEqual(b, [[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]]);
