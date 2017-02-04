/**
 * Minimum Coin Change Problem 
 * The minimum coin change problem is a variation of the coin change problem. The coin change problem consists 
 * of finding out in how many ways we can make change for a particular amount of cents using a given amount of 
 * set denominations d1... dn. The minimum coin change problem consists of finding the minimum number of coins 
 * needed to make a particular amount of cents using a given amount of set denominations d1... dn.
 *
 * For example, the United States has the following denominations (coins): d1 = 1; d2 = 5; d3 = 10; and d4 = 25.
 * If we need to make change for 36 cents, we can use 1 quarter (25), 1 dime (10), and 1 penny (1).
 *
 */
function MinCoinChange(coins, changes) {
	var coins = coins;
	var cache = {};
	return makeChanges(changes);

	function makeChanges(amount) {
		if (amount < 0) return [];
		if (cache[amount]) return cache[amount];
		
		var minCoinsCombo = [];
		var newAmount, newCoinsCombo;

		for (var i = 0; i < coins.length; i++) {
			var coin = coins[i];
			newAmount = amount - coin;
			if (newAmount >= 0) { // include zero so that we don't need to separately handle zero cases.
				
				newCoinsCombo = makeChanges(newAmount); // recursively make changes as long as the coin is not greater than changes.
				
				// now that we have the newest coins combo.
				// we will compare if the new combo with the current minimum combo minus the current one coin whichever is smaller.
				// when the current minimum combo is initialized with an empty array, there is no coins that can be subtracted from it, 
				// so we need to rule out this case.
				if ((newCoinsCombo.length < minCoinsCombo.length - 1 || !minCoinsCombo.length) && 
					// we need to make sure the new coins combo contains any coins in order to be assigned as the new minimum combo 
					// unless the current change (new amount) is zero.
					(newCoinsCombo.length || !newAmount))
					// when we find a new minimum coins combo, 
					// we add the coin back and make it the minimum coins combo for the current amount of changes.
					minCoinsCombo = [coin].concat(newCoinsCombo);
			}
		}
		return cache[amount] = minCoinsCombo;
	}
}

module.exports = MinCoinChange;