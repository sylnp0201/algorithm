'use strict';

const assert = require('assert');

class Node {
  constructor(value, N) {
    this.value = value;
    this.next = new Array(N);
  }
}

function charToIdx(c) {
  return c.charCodeAt(0) - 'a'.charCodeAt(0);
}

function _add(node, word, i, N) {
  if (!node) {
    node = new Node(false, N);
  }

  if (i === word.length - 1) {
    node.value = true;
    return node;
  }

  const idx = charToIdx(word[i]);
  node.next[idx] = _add(node.next[idx], word, i+1, N);

  return node;
}

function _get(node, word, i) {
  if (!node) {
    return false;
  }

  if (i === word.length - 1) {
    return node.value;
  }

  const idx = charToIdx(word[i]);

  return _get(node.next[idx], word, i+1);
}

class Trie {
  constructor(N) {
    this.N = N;
    this.root = new Node(false, N);
  }

  add(word) {
    this.root = _add(this.root, word, 0, this.N);
  }

  get(word) {
    return _get(this.root, word, 0);
  }
}

// TEST CODE
const trie = new Trie(26);

trie.add('abc');
trie.add('hello');

assert.equal(trie.get('abc'), true);
assert.equal(trie.get('hello'), true);
assert.equal(trie.get('h'), false);
assert.equal(trie.get('hello1'), false);
