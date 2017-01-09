'use strict';

function minIdx(hash, buffer) {
  let result = buffer[0];

  buffer.forEach((b) => {
    if (hash[b] < hash[result]) {
      result = b;
    }
  });

  return result;
}

var lengthOfLongestSubstringKDistinct = function(s, k) {
    if (k < 1) {
      return 0;
    }

    const N = s.length;
    let start = 0;
    let longest = 0;
    let buffer = [];
    const hash = (new Array(256)).fill(-1);

    for (let i = 0; i < N; i++) {
        const c = s.charCodeAt(i);

        if (buffer.indexOf(c) === -1) {
          if (buffer.length >= k) {
            const x = minIdx(hash, buffer);
            start = hash[x] + 1;
            // console.log('to slice', buffer, x);
            buffer.splice(buffer.indexOf(x), 1);
            // console.log('after slice', buffer);
          }

          buffer.push(c);
        }

        // start = Math.max(hash[c] + 1, start);
        hash[c] = i;
        longest = Math.max(longest, i - start + 1);
    }

    return longest;
};

console.log(lengthOfLongestSubstringKDistinct("eceba", 2)); // 3
console.log(lengthOfLongestSubstringKDistinct("a", 0)); // 0
console.log(lengthOfLongestSubstringKDistinct("aba", 1)); // 1
console.log(lengthOfLongestSubstringKDistinct("abaccc", 2)); // 4
