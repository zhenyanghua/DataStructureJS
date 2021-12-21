class MinHeap {
    /**
     * The default implementation is a MinHeap, 
     * but by using a comparator function, we 
     * could easily reverse the sorting and make
     * it a MaxHeap.
     */
    constructor(compare) {
      this.compare = compare;
      this.heap = [];
    }

    /**
     * Transform list into a heap, in-place, in O(len(arr)) time.
     */
     heapify(arr) {
        const n = arr.length;
        // the largest index with a child index must 
        // have 2*i + 1 < n, or i < (n - 1)/2.
        // If n is even, let n = 2*j, so i < (2 * j - 1) / 2
        // we have i < j - 1/2 so the largest i = j - 1, 
        // so we take the floor.
        // If n is odd, let n = 2*j + 1, so i < (2 * j + 1 - 1) / 2
        // we have i < j, so the larget i = j - 1,
        // which is the same result as we take the floor.
        // So we will take the floor of i = j - 1 or i = n/2 - 1
        const upper = Math.floor(n / 2) - 1;
        for (let i = 0; i <= upper; i++) {
          this._bubbleUp(arr, i);
        }
    }
  
    push(node) {
      // insert the new node at the end of the heap array
      this.heap.push(node);
      // maintain the heap invariant
      this._bubbleUp(this.heap, this.heap.length - 1);
    }
  
    // The time complexity of this is the height of the tree O(logn)
    _bubbleUp(heap, i) {
      while (i > 0) {
        const element = heap[i];
        // i = 2*pI + 1 => pI = (i - 1) / 2;
        const parentIndex = Math.floor((i - 1) / 2);
        const parent = heap[parentIndex];
  
        // assuming current heap is invariant, 
        // if the parent is not greater than the element, 
        // no ops
        if (this.compare(parent, element) <= 0) break
  
        // swap the parent with the child
        heap[i] = parent;
        heap[parentIndex] = element;
        i = parentIndex;
      }
    }
  



    pop() {
      const min = this.heap[0];
      // move the last node to the top
      this.heap[0] = this.heap[this.size() - 1];
      // remove it from the array;
      this.heap.pop();
      // maintain the heap invariant
      this._bubbleDown(this.heap, 0);
      return min;
    }
  
    _bubbleDown(heap, i) {
      let min = i;
      const n = heap.length;
  
      while (i < n) {
        // their indice in array
        const left = 2 * i + 1;
        const right = left + 1;
        // check if left is smaller than the parent
        if (left < n && this.compare(heap[left], heap[min]) < 0) {
          min = left;
        }
        // check if right is smaller than the parent and the left
        if (right < n 
        && this.compare(heap[right], heap[min]) < 0
        && this.compare(heap[right], heap[left]) < 0 ) {
          min = right;
        }
        // nothing changes
        if (min === i) break;
        // swap min and the current node
        [heap[min], heap[i]] = [heap[i], heap[min]];
        // set current node to min and continue to bubble down from current;
        i = min;
      }
    }
  
    peek() {
      return this.heap[0];
    }
  
    size() {
      return this.heap.length;
    }
  }
  
  module.exports = MinHeap;