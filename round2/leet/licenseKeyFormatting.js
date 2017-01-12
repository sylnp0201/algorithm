'use strict';

const assert = require('assert');

/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function(S, K) {
  const s = S.replace(/-/g, '').toUpperCase();

  if (s.length < 1) {
    return '';
  }

  const dashNum = Math.ceil(s.length / K) - 1;
  const len = dashNum + s.length;
  const head = s % K;

  const result = new Array(len);
  let i = s.length - 1;
  let j = len - 1;

  while(j >= 0) {
    if ((s.length - i - 1) % K === 0 && i !== s.length - 1 && i !== -1) {
      result[j--] = '-';
    }
    result[j--] = s[i--];
  }

  return result.join('');
};

assert.equal(licenseKeyFormatting("---", 3), "");
assert.equal(licenseKeyFormatting("a-a-a-a-", 1), "A-A-A-A");
assert.equal(licenseKeyFormatting("2-4A0r7-4k", 4), "24A0-R74K");
assert.equal(licenseKeyFormatting("2-4A0r7-4k", 3), "24-A0R-74K");
