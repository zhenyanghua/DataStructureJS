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

ArrayList.prototype.print = function() {
	console.log(this.toString());
}


ArrayList.prototype.swap = function(array, i, j) {
	var tmp = array[i];
	array[i] = array[j];
	array[j] = tmp;
	console.log('after swap', array)
}

/**
 * Bubble Sort
 */
ArrayList.prototype.bubbleSort = function() {
	for (var i = 0; i < this.array.length; i++) {
		for (var j = 0; j < this.array.length - 1 - i; j++) {
			if (this.array[j] > this.array[j+1])
				this.swap(this.array, j, j+1);
		}
	}
}

/**
 * Test Bubble Sort
 */
var list = new ArrayList();
list.insert(5, 4, 3, 2, 1);
list.print()
list.bubbleSort();
list.print();




