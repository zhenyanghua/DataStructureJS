var ArrayList = require('../../algorithms/SortnSearch.js');

describe("ArrayList and its basic methods", function() {
	it("creates an instance of ArrayList", function() {
		var list  = new ArrayList();
		expect(list.array.length).toEqual(0);
	});

	it("inserts items into the ArrayList", function() {
		var list = new ArrayList();
		list.insert(1, 2, 3, 4, 5);
		expect(list.array.length).toEqual(5);
		expect(list.array[0]).toEqual(1);
		expect(list.array[4]).toEqual(5);
	});

	it("converts array to string", function() {
		var list = new ArrayList();
		list.insert(1, 2, 3, 4, 5);
		expect(list.toString()).toEqual('1,2,3,4,5');
	});

	it("swaps two items in the ArrayList by their index", function() {
		var list = new ArrayList();
		list.insert('a','b','c','d','e');
		list.swap(1, 4);
		expect(list.toString()).toEqual('a,e,c,d,b');
	});
});

describe("ArrayList and its sorting methods", function() {
	var list;
	var sortedList = "1,2,2,3,3,4,5";

	beforeEach(function() {
		list = new ArrayList();
		list.insert(2, 5, 3, 4, 3, 2, 1);
	});

	it("uses Bubble Sort", function() {
		list.bubbleSort();
		expect(list.toString()).toEqual(sortedList);
	});

	it("uses Selection Sort", function() {
		list.selectionSort();
		expect(list.toString()).toEqual(sortedList);
	});

	it("uses Insertion Sort", function() {
		list.insertionSort();
		expect(list.toString()).toEqual(sortedList);
	});

	it("uses Merge Sort", function() {
		list.mergeSort();
		expect(list.toString()).toEqual(sortedList);
	});

	it("uses Quick Sort", function() {
		list.quickSort();
		expect(list.toString()).toEqual(sortedList);
	});

	it("uses sequential search when the array is not sorted, and uses binary search when it is sorted.", function() {
		expect(list.indexOf(3)).toEqual(2);
		list.quickSort();
		expect(list.indexOf(3, true)).toEqual(3);
	})
})