function Stack() {
  this.items = [];
}

Stack.prototype.push = function(item) {
  this.items.push(item);
};

Stack.prototype.pop = function() {
  return this.items.pop();
}

Stack.prototype.peek = function() {
  return this.items[this.items.length - 1];
}

Stack.prototype.isEmpty = function() {
  return this.items.length === 0;
}

Stack.prototype.clear = function() {
  this.items = [];
}

Stack.prototype.size = function() {
  return this.items.length;
}