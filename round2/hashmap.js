'use strict';

const N = 10;

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

function hash(key) {
  let h = 37;
  for (let i = 0; i < key.length; i++) {
    h = h * 191 + key.charCodeAt(i);
  }
  return h % N;
}

function _add(node, key, value) {
  if (!node) {
    return new Node(key, value);
  }

  node.next = _add(node.next, key, value);

  return node;
}

function _get(node, key) {
  if (!node) {
    return null;
  }

  if (node.key === key) {
    return node.value;
  }

  return _get(node.next, key);
}

class Hashmap {
  constructor() {
    this.s = new Array(N);
  }

  add(key, value) {
    const idx = hash(key);
    this.s[idx] = _add(this.s[idx], key, value);
  }

  get(key) {
    if (typeof key !== 'string') {
      return null;
    }

    const idx = hash(key);
    return _get(this.s[idx], key);
  }
}

module.exports = Hashmap;

// TEST CODE
// const hashmap = new Hashmap();
//
// hashmap.add("one", 1);
// hashmap.add("two", 2);
// hashmap.add("three", 3);
//
// console.log(hashmap.get("one"));
// console.log(hashmap.get("two"));
// console.log(hashmap.get("three"));
// console.log(hashmap.get("four"));
// console.log(hashmap.get());
// console.log(hashmap);
