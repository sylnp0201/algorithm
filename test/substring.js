'use strict';

const fs = require('fs');
const kmp = require('knuth-morris-pratt');
const NOT_FOUND = -1
const CONTEXT_RANGE = 40;

fs.readFile('src/data/mobydick.txt', 'utf8', function(err, data) {
  if (err) throw err;

  const idx = kmp(data, 'the');
  console.log(idx);

  if (idx === NOT_FOUND) {
    console.log('Not Found');
  } else {
    const start = Math.max(idx - CONTEXT_RANGE, 0);
    const end = Math.min(idx + CONTEXT_RANGE, data.length - 1);
    console.log(data.slice(start, end));
  }
});
