'use strict';

const assert = require('assert');
const fs = require('fs');
const NOT_FOUND = -1
const R = 256;

function charcode(char) {
  return char.charCodeAt(0);
}

// substring search using a deterministic finite state automation
class DFA {
  constructor(pattern) {
    const M = pattern.length;
    const dfa = new Array(R);
    for (let i = 0; i < R; i++) {
      dfa[i] = (new Array(M)).fill(0);
    }

    dfa[pattern.charCodeAt(0)][0] = 1;

    let X, j;

    for (j = 1, X = 0; j < M; j++) {
      const c = pattern.charCodeAt(j); // integer
      for (let i = 0; i < R; i++) {
        dfa[i][j] = dfa[i][X];
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
  const dfa = new DFA(pattern);
  const N = text.length;
  const M = pattern.length;

  let i, j;

  for (i = 0, j = 0; i < N && j < M; i++) {
    j = dfa.check(text.charCodeAt(i), j);
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
