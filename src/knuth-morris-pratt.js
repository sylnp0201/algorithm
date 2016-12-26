'use strict';

const NOT_FOUND = -1;
const R = 256;

function cToI(c) {
  return c.charCodeAt(0);
}

// deterministic finite state automation
class DFA {
  constructor(pattern) {
    const dfa = new Array(R);

    for (let i = 0; i < R; i++) {
      dfa[i] = (new Array(pattern.length)).fill(0);
    }

    dfa[cToI(pattern[0])][0] = 1;

    let j, X;

    for (j = 1, X = 0; j < pattern.length; j++) {
      for (let k = 0; k < R; k++) {
        dfa[k][j] = dfa[k][X];
      }

      const charcode = cToI(pattern[j]);
      dfa[charcode][j] = j + 1;

      X = dfa[charcode][X];
    }

    this.dfa = dfa;
  }

  at(i, j) {
    return this.dfa[i][j];
  }
}

function search(string, pattern) {
  const dfa = new DFA(pattern);
  let sLen = string.length;
  let pLen = pattern.length;
  let i, j;

  for (i = 0, j = 0; i < sLen && j < pLen; i++) {
    const c = cToI(string[i]);
    j = dfa.at(c, j);
  }

  if (j === pLen) {
    return i - pLen;
  }

  return NOT_FOUND;
}

module.exports = search;

// TEST CODE
// console.log(search('00CCABABABABABACDD', 'ABABAC')); // return 10
