/**
 * An array list as a utility to store and show
 * the bits and bytes of various sorting algorithms.
 */
function ArrayList() {
	this.array = [];
}

ArrayList.prototype.insert = function() {
	if (arguments.length === 0) return;
	Array.prototype.push.apply(this.array, arguments);
}

ArrayList.prototype.toString = function() {
	return this.array.join();
}

ArrayList.prototype.swap = function(i, j) {
	var tmp = this.array[i];
	this.array[i] = this.array[j];
	this.array[j] = tmp;
}

/**
 * Bubble Sort
 */
ArrayList.prototype.bubbleSort = function() {
	for (var i = 0; i < this.array.length; i++) {
		for (var j = 0; j < this.array.length - 1 - i; j++) {
			if (this.array[j] > this.array[j+1])
				this.swap(j, j+1);
		}
	}
}

/**
 * Selection Sort
 */
ArrayList.prototype.selectionSort = function() {
	var minInd;
	for (var i = 0; i < this.array.length; i++) {
		minInd = i;
		for (var j = i; j < this.array.length; j++) {
			if (this.array[j] < this.array[i]) minInd = j;
		}
		if (minInd !== i) this.swap(i, minInd)
	}
}

/**
 * Insertion Sort
 */
ArrayList.prototype.insertionSort = function() {
	var num, sortedInd;
	for (var i = 1; i < this.array.length; i++) {
		num = this.array[i];
		sortedInd = i - 1;
		while(sortedInd >= 0 && num < this.array[sortedInd]) {
			this.swap(sortedInd, sortedInd + 1);
			sortedInd--;
		}
	}
}

/**
 * Merge Sort
 */
ArrayList.prototype.mergeSort = function(data) {
	if (!data) data = this.array;
	if (data.length < 2) return data;

	var mInd = ~~(data.length / 2);
	var left = data.slice(0, mInd);
	var right = data.slice(mInd);

	left = this.mergeSort(left);
	right = this.mergeSort(right);

	return this.merge(data, left, right);
}

ArrayList.prototype.merge = function(dest, left, right) {
	var dInd = 0,
		lInd = 0,
		rInd = 0;
	while(lInd < left.length && rInd < right.length) {
		if (left[lInd] <= right[rInd]) dest[dInd++] = left[lInd++];
		else dest[dInd++] = right[rInd++];
	}
	while(lInd < left.length) dest[dInd++] = left[lInd++];
	while(rInd < right.length) dest[dInd++] = right[rInd++];

	return dest;
}

/**
 * Quick Sort
 */
ArrayList.prototype.quickSort = function(data) {
	var replaceThisArray = false;
	if (!data) {
		data = this.array;
		replaceThisArray = true;
	}
	if (data.length < 2) return data;

	var pivotInd = ~~(data.length / 2);
	var pivotVal = data[pivotInd];

	var left = [],
		right = [];
	for(var i = 0; i < data.length; i++) {
		if (i === pivotInd) continue;
		if (data[i] <= pivotVal) left.push(data[i]);
		else right.push(data[i]);
	}
	data = this.quickSort(left)
				.concat([pivotVal])
				.concat(this.quickSort(right));
	if (replaceThisArray) this.array = data;
	return data;
}

/**
 * Binary Search
 */
ArrayList.prototype.indexOf = function(item, isSorted) {
	if (!isSorted) return this.array.indexOf(item);

	return this.bSearch(this.array, item);
}

ArrayList.prototype.bSearch = function(list, item) {
	var mInd = ~~(list.length / 2),
		lInd = 0,
		rInd = list.length - 1;
	while(lInd <= rInd) {
		if (item === list[mInd]) return mInd;
		if (item < list[mInd]) rInd = mInd;
		else lInd = mInd + 1;
		mInd = ~~((rInd + lInd) / 2);
	}
	return -1;
}

module.exports = ArrayList;