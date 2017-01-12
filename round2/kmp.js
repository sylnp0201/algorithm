'use strict';

const assert = require('assert');
const fs = require('fs');
const NOT_FOUND = -1
const R = 256;

class DFA {
  constructor(pattern) {
    const M = pattern.length;

    const dfa = new Array(R);
    for (let i = 0; i < R; i++) {
      dfa[i] = (new Array(M)).fill(0);
    }

    dfa[pattern.charCodeAt(0)][0] = 1;

    let j, X;

    for (X = 0, j = 1; j < M; j++) {
      const c = pattern.charCodeAt(j);

      for (let k = 0; k < R; k++) {
        dfa[k][j] = dfa[k][X];
      }

      dfa[c][j] = j + 1;

      X = dfa[c][X];
    }

    this.dfa = dfa;
  }

  check(c, j) {
    return this.dfa[c][j];
  }
}

function kmp(text, pattern) {
  const N = text.length;
  const M = pattern.length;
  const dfa = new DFA(pattern);

  let i, j;

  for (i = 0, j = 0; i < N && j < M; i++) {
    const c = text.charCodeAt(i);
    j = dfa.check(c, j);
  }

  if (j === M) {
    return i - M;
  }

  return NOT_FOUND;
}

fs.readFile('src/data/mobydick.txt', 'utf8', function(err, data) {
  if (err) throw err;

  assert.equal(kmp(data, 'Voyages'), 10426);
  assert.equal(kmp(data, 'the'), 418);
});
