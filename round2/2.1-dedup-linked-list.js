'use strict';

const LinkedList = require('./linked-list');
const Hashmap = require('./hashmap');

function dedupe(list) {
  const hashmap = new Hashmap();

  let prev = null;
  let current = list.first;

  while(current) {
    const value = current.value;

    if (!hashmap.get(value)) {
      hashmap.add(value, true);
      prev = current;
    } else {
      prev.next = current.next;
    }

    current = current.next;
  }
}

// TEST CODE
const list = new LinkedList();
list.add('one');
list.add('two');
list.add('two');
list.add('three');
list.add('three');
list.add('three');
dedupe(list);

list.iterate(function(value) {
  console.log(value);
});
