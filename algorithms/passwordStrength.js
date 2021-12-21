/**
 * Find the sum of all distinct characters count from the substrings.
 * e.g "good" Upper cases chars are substrings
 * Good 1
 * gOod 1
 * goOd 1
 * gooD 1
 * GOod 2
 * gOOd 1
 * goOD 2
 * GOOd 2
 * gOOD 2
 * GOOD 3
 * 
 * sum = 1 + 1 + 1 + 1 + 2 + 1 + 2 + 2 + 2 + 3 = 16
 */

// brute force
function solution1(password) {
    const n = password.length;
    const res = [];
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            res.push(password.substring(i, j + 1));
        }
    }
    return res.map(x => new Set(x).size).reduce((a, b) => a + b, 0);
}

// Clever 
/**
 *  To find all distinct characters count from all substrings is equivalent of 
 *  finding the count of all distinct substrings that contains each character.
 *  For each character, we could find all possible substrings that contains them
 *  and add to a hash set to avoid duplicates, but to find all possible substrings 
 *  is takes as much times in quadratic as in a brute force approach, but with such 
 *  combinatorial problem when only asking for count, we could avoid looking for
 *  the exact substrings, but using combination = A x B to find out possible count
 *  of substrings that contains current character.
 * 
 *  e.g. password = 'good'
 *  let the following be true:
 *  when there isn't duplicated characters previously:
 *  combinations = (number of character to its left + itself) * (itself + the number of characters to its right)
 *  when there is duplicated characters:
 *  combinations = ((number of character to its left - number of characters up to the previous same character) + itself) * (itself + the number of characters to its right)
 *  i = 0, char = 'g': count of substrings that contain 'g' = (0 + 1) * (1 + 3)
 *  i = 1, char = 'o': count of substrings that contain 'o' = (1 + 1) * (1 + 2)
 *  i = 2, char = 'o': count of substrings that contain 'o' = ((2 - 2) + 1) * (1 + 1)
 *  i = 3, char = 'd': count of substrings that contain 'd' = (3 + 1) * (1 + 0)
 *  sum = 16
 * 
 *  e.g. password = 'goocod'
 *  i = 0, char = 'g': count of substrings that contain 'g' = (0 + 1) * (1 + 5)
 *  i = 1, char = 'o': count of substrings that contain 'o' = (1 + 1) * (1 + 4)
 *  i = 2, char = 'o': count of substrings that contain 'o' = ((2 - 2) + 1) * (1 + 3)
 *  i = 3, char = 'c': count of substrings that contain 'c' = (3 + 1) * (1 + 2)
 *  i = 4, char = 'o': count of substrings that contain 'o' = ((4 - 3) + 1) * (1 + 1)
 *  i = 5, char = 'd': count of substrings that contain 'd' = (5 + 1) * (1 + 0)
 *  sum = 42
 */
function solution2(password) {
    const lastOccurenceIndex = new Map();
    const n = password.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        const char = password[i];
        let left = i + 1;
        const right = n - i;
        if (lastOccurenceIndex.has(char)) {
            left -= (lastOccurenceIndex.get(char) + 1);
        }
        lastOccurenceIndex.set(char, i);
        sum += left * right;
    }
    return sum;
}

// Test
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
// fixed tests input
const inputs = [
    'good',
    'gocod',
    'goocod',
];

// random tests input
const chars = 'abcdefghijklmnopqrstuvwxyz';
for (let i = 0; i < 1000; i++) {
    const len = getRandomInt(1, 101);
    const sb = [];
    for (let j = 0; j < len; j++) {
        sb.push(chars[getRandomInt(0, 26)]);
    }
    inputs.push(sb.join(''));
}

let passed = 0;
inputs.forEach(p => {
    const s1 = solution1(p);
    const s2 = solution2(p);
    if (s1 !== s2) {
        console.log(`unmatch results: password = "${p}", count = ${s1} <> ${s2}`);
    } else {
        passed++;
    }
});
console.log(`Passed ${passed} tests, failed: ${inputs.length - passed} tests`);
