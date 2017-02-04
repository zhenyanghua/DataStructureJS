var minCoinChange = require('../../../algorithms/dynamic_programming/MinCoinChange.js');

describe("MinCoinChange probelm", function() {
	var coins;
	beforeEach(function() {
		coins = [1, 5, 10, 25]
	});

	it("should returns the minimum amount of coins.", function() {
		expect(minCoinChange(coins, 20).toString()).toEqual("10,10");
		expect(minCoinChange(coins, 31).toString()).toEqual("1,5,25");
		expect(minCoinChange(coins, 30).toString()).toEqual("5,25");
	});

});