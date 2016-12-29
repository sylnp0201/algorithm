'use strict';

const DictTries = require('./dict-tries');
const DictHash = require('./dict-hash');
const data = require('data/dictionary.json');

const benchmark = require('./benchmark');

// half hit and half missing
function retrieveAllKeys(dict) {
  let i = 0;
  Object.keys(data).forEach(key => {
    if (i % 2 === 0) {
      dict.get(key); // hit
    } else {
      dict.get(`z${key}`); // miss
    }
    i++;
  });
}

benchmark('dict-tries', () => {
  const dict = new DictTries(data);

  retrieveAllKeys(dict);
});

benchmark('dict-hash', () => {
  const dict = new DictHash(data);

  retrieveAllKeys(dict);
});

/*
  On my local,
  Without missing case, Tries is twice as fast as Hashmap.
  With missing case, Tries is three ~ four times as fast as Hashmap.
*/
