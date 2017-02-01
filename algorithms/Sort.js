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

ArrayList.prototype.print = function(msg) {
	var prefix = msg ? "*" + msg + "* - " : "";
	console.log(prefix + this.toString());
}


ArrayList.prototype.swap = function(i, j) {
	var tmp = this.array[i];
	this.array[i] = this.array[j];
	this.array[j] = tmp;
	console.log('after swap', this.array)
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
 * Usage - Creating an unsorted list
 */
function createUnsortedList() {
	var list = new ArrayList();
	list.insert(5, 4, 3, 2, 1);
	list.print('Unsorted');
	printDash();
	return list;
}

function printDash() {
	console.log('-----------------------------');
}

function printTest(msg) {
	printDash();
	console.log(msg);
	printDash();
}

function formatPrint(list) {
	printDash();
	list.print('Sorted');
	printDash();
}

/**
 * Test Bubble Sort
 */
printTest('Using Bubble Sort.');
var list = createUnsortedList();
list.bubbleSort();
formatPrint(list);

/**
 * Test Selection Sort
 */
printTest('Using Selection Sort.');
list = createUnsortedList();
list.selectionSort();
formatPrint(list);

/**
 * Test Insertion Sort
 */
printTest('Using Insertion Sort.');
list = createUnsortedList();
list.insertionSort();
formatPrint(list);






