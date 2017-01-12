'use strict';

const assert = require('assert');
const R = 26;

function charcode(c) {
  return c.charCodeAt(0) - 'a'.charCodeAt(0);
}

function toCharList(word) {
  const list = [];
  for (let i = 0; i < word.length; i++) {
    list.push(charcode(word[i]));
  }
  return list;
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = new Array(R);
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  add(word, value) {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = charcode(word[i]);
      if (!cur.next[c]) {
        cur.next[c] = new Node();
      }
      if (i === word.length - 1) {
        cur.next[c].value = value;
        return;
      }

      cur = cur.next[c];
    }
  }

  get(list) {
    let cur = this.root;
    for (let i = 0; i < list.length; i++) {
      const c = list[i];

      if (!cur.next[c]) {
        return null;
      }

      if (i === list.length - 1) {
        return cur.next[c].value;
      }

      cur = cur.next[c];
    }
  }
}

const trie = new Trie();
trie.add('hello', -1);
trie.add('world', -2);
assert.equal(trie.get(toCharList('hello')), -1);
assert.equal(trie.get(toCharList('world')), -2);
assert.equal(trie.get(toCharList('hell')), null);
assert.equal(trie.get(toCharList('helloo')), null);
