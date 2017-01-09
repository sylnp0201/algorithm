'use strict';

function Node(radix, value, prev) {
  this.next = new Array(radix);
  this.value = value;
  this.prev = prev;
}

// r-nary tries r stands for radix
function Tries(radix) {
  this.radix = radix;
  this.root = new Node(radix, null, null);
}

function _add(prev, node, keylist, i, value, radix) {
  if (i == keylist.length) {
    if (!node) {
      return new Node(radix, value, prev);
    }


    node.value = value;
    return node;
  }

  if (!node) {
    node = new Node(radix, null, prev);
  }

  node.next[keylist[i]] = _add(node, node.next[keylist[i]], keylist, i + 1, value, radix);

  return node;
};

// a recurrsive helper function that gets all values from a subtree
function _traverseSubTree(node, fn) {
  if (!node) return;

  if (node.value) fn(node);

  node.next.forEach(nextNode => {
    _traverseSubTree(nextNode, fn);
  });

  return node;
}

function _findNodeFrom(root, keylist) {
  const length = keylist.length;
  let node = root;
  let lastMatch = root;

  for (let i = 0; i < length; i++) {
    const k = keylist[i];

    node = node.next[k];
    if (!node) break;
    lastMatch = node;
  }

  if (node !== lastMatch) {
    return {
      matched: false,
      node: lastMatch,
    };
  }

  return {
    matched: true,
    node,
  };
}

function keyFromNode(node) {
  const keylist = [];

  while(!!node.prev) {
    keylist.unshift(node.prev.next.indexOf(node));
    node = node.prev;
  }

  return keylist;
}

Tries.prototype.add = function(keylist, value) {
  if (!Array.isArray(keylist)) {
    throw new Error(`Expect an Array, instead got ${typeof keylist}: ${keylist}`);
  }

  this.root = _add(null, this.root, keylist, 0, value, this.radix);
};

Tries.prototype.get = function(keylist) {
  const result = _findNodeFrom(this.root, keylist);

  if (!result.matched) return null;

  return result.node.value;
};

Tries.prototype.prefix = function(keylist) {
  const searchResult = _findNodeFrom(this.root, keylist);
  const lastMatch = searchResult.node;
  const result = [];

  _traverseSubTree(lastMatch, (nd) => {
    result.push(nd);
  });

  return result.map(nd => keyFromNode(nd));
};

module.exports = Tries;

// TEST CODE
// const CHAR_OFFSET = 'A'.charCodeAt(0);
//
// function toCharList(str) {
//   return Array.prototype.map.call(str, (c) => c.charCodeAt(0) - CHAR_OFFSET);
// }
//
// const s = 'abc';
// const tries = new Tries(26);
//
// tries.add(toCharList('abc'), 'abc');
// tries.add(toCharList('hello'), 'hello');
//
// console.log(tries.get(toCharList('abc')));
// console.log(tries.get(toCharList('hello')));
// console.log(tries.get(toCharList('h')));
// console.log(tries.get(toCharList('hello1')));
