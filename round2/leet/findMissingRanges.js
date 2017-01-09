'use strict';

const assert = require('assert');

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function(nums, lower, upper) {
  if (nums.length >= 1) {
    let start = 0;
    while(nums[start] < lower) {
      start++;
    }

    let end = nums.length - 1;
    while(nums[end] > upper) {
      end--;
    }

    if (start > nums.length || end < 0) {
      return [];
    }

    nums = nums.slice(start, end + 1);
  } else {
    nums = [];
  }

  nums.unshift(lower - 1);
  nums.push(upper + 1);

  // console.log(nums);
  const missing = [];

  for (let i = 0; i < nums.length - 1; i++) {
    const dist = nums[i+1] - nums[i];

    if (dist === 2) {
      missing.push(String(nums[i]+1));
    } else if (dist > 2) {
      missing.push(`${nums[i]+1}->${nums[i+1]-1}`);
    }
  }

  return missing;
};

assert.deepEqual(
  findMissingRanges([0, 1, 3, 50, 75], 0, 99),
  ["2", "4->49", "51->74", "76->99"]
);

assert.deepEqual(
  findMissingRanges([], 1, 1),
  ["1"]
);

assert.deepEqual(
  findMissingRanges([-1], -2, -1),
  ["-2"]
);
