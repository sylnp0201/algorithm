'use strict';

// the default optimal capacity less than or equal to N^2
const N = 1000;

class Node {
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next || null;
  }
}

function hash(key, n) {
  if (typeof key !== 'string') {
    throw new Error('key must be a string');
  }

  let h = 991;

  for (let i = 0; i < key.length; i++) {
    h = (h * 191) + key.charCodeAt(i);
  }

  return h % n;
}

function _add(node, key, value) {
  if (!node) {
    return new Node(key, value);
  }

  if (node.key === key) {
    node.value = value;
  } else {
    node.next = _add(node.next, key, value);
  }


  return node;
}

function _get(node, key) {
  if (!node) return null;
  if (node.key === key) return node.value;

  return _get(node.next, key);
}

class Hashmap {
  constructor(n) {
    this.n = n || N;
    this.s = (new Array(this.n)).fill(null);
  }

  add(key, value) {
    const idx = hash(key, this.n);
    this.s[idx] = _add(this.s[idx], key, value);
  }

  get(key) {
    const idx = hash(key, this.n);
    return _get(this.s[idx], key);
  }
}

module.exports = Hashmap;

// TEST CODE
// const hashmap = new Hashmap(2);
// hashmap.add('one', 1);
// hashmap.add('two', 2);
// hashmap.add('three', 3);
// hashmap.add('four', 4);
// hashmap.add('five', 5);
// hashmap.add('six', 6);
// hashmap.add('seven', 7);
// hashmap.add('eight', 8);
// hashmap.add('nine', 9);
// hashmap.add('ten', 10);
//
// console.log(hashmap.get('five'));
// console.log(hashmap.get('ten'));
// console.log(hashmap.get('two'));
// console.log(hashmap.get('seven'));
// console.log(hashmap);
