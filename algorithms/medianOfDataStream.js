import MinHeap from "./heap.js";
import { getRandomInt } from "./random.js";
/*
* Median of Data Stream
* Given a stream of numbers, find the median number at any given time 
* (accurate to 1 decimal place). Do this in O(1) time complexity.
*
* Example:
*
* add_number(1)
* add_number(2)
* add_number(3)
* get_median() == 2.0
* add_number(4)
* get_median() == 2.5
*/

// solution1 - Brute force
class Solution1 {
    constructor() {
        this.arr = [];
    }
    add_number(n) {
        this.arr.push(n);
    }
    get_median() {
        this.arr.sort();
        if (this.arr.length % 2 === 1) {
            const m = Math.floor(this.arr.length / 2);
            return this.arr[m].toFixed(1);
        }
        const m2 = Math.floor(this.arr.length / 2);
        const m1 = m2 - 1;
        return ((this.arr[m1] + this.arr[m2]) / 2).toFixed(1);
    }
}


// solution2 - Clever
/**
 * Because it is a stream, we have the control over to add number 
 * one at a time. 
 * The median number is greater than half of the numbers while smaller
 * than the other half of the numbers, or we could say
 * it is the max of the first half and the min of the other half. 
 * The goal is to have constant time for getting median value, which 
 * means at the time of the calling, we must already know the either the 
 * median number or the max of the first half and the min of the other half.
 * Heap ressembles this use case. We could keep a max heap to track the 
 * max of the first half and a min heap to track the min of the other half.
 * The goal is to keep the size of first half the same as the other half.
 * Whenever a new number is ready to be added, we compare it with min and max.
 * 1. If it is less than the max, we add it to the first half (max heap), 
 * then we check if the first half is at most 1 item more than second half,
 * if it is more than 1, then we pop the max of the first half and add it to the 
 * second half.
 * 2. If the new number is greater than the max, we add it to the second half,
 * then we check if the second half is morn than the first half, 
 * if it is, then we pop the min of the second half and add it to the
 * first half.
 * Through the above steps 1 and 2, we could make sure the first half always
 * at most has one more item than the second half. 
 * When the get_median() is called, we could check if the first size is more
 * than the second half size, in which case, we would return the max value
 * of the first half, otherwise, we could peek the max from the first half 
 * and the min from the second half and get the median from these two numbers.
 * 
 * The insertion complexity for every number it read from the stream is the
 * height of the heap, which is O(log(N)), n is the size of the existing reads,
 * so for N items read from the stream, the overall complexity is O(NLog(N)).
 * As for the get_median(), it has O(1) lookup time.
 * 
 */
class Solution2 {
    constructor() {
        // holds the first half of the numbers
        this.maxHeap = new MinHeap((a, b) => b - a);
        // holds the second half of the numbers
        this.minHeap = new MinHeap((a, b) => a - b);
    }

    add_number(n) {
        if (this.maxHeap.size() === 0) {
            this.maxHeap.push(n);
        } else {
            const max = this.maxHeap.peek();
            if (n <= max) {
                this.maxHeap.push(n);
                if (this.maxHeap.size() - this.minHeap.size() > 1) {
                    this.minHeap.push(this.maxHeap.pop());
                }
            } else {
                this.minHeap.push(n);
                if (this.minHeap.size() > this.maxHeap.size()) {
                    this.maxHeap.push(this.minHeap.pop());
                }
            }
        }
    }

    get_median() {
        let median;
        if (this.maxHeap.size() > this.minHeap.size()) {
            median = this.maxHeap.peek();
        } else {
            median = (this.maxHeap.peek() + this.minHeap.peek()) / 2;
        }
        return median.toFixed(1);
    }
}

// Test
// Fixed tests
const inputs = [
    [1, 2, 3, 4],
];
// Random tests
for (let i = 0; i < 1000; i++) {
    const len = getRandomInt(1, 101);
    const stream = [];
    for (let j = 0; j < len; j++) {
        stream.push(getRandomInt(1, 101));
    }
    inputs.push(stream);
}

let passed = 0;

inputs.forEach(arr => {
    const s1 = new Solution1();
    const s2 = new Solution2();
    let success = true;
    for (let x of arr) {
        const m1 = s1.add_number(x);
        const m2 = s2.add_number(x);
        if (m1 !== m2) {
            success = false;
            break;
        }
    }
    if (success) passed++;
});

console.log(`Passed ${passed} tests, and failed ${inputs.length - passed} tests.`)
