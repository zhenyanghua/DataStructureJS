/**
 * Create a Queue
 */
function Queue() {
  this.items = [];
}

Queue.prototype.enqueue = function() {
  Array.prototype.push.apply(this.items, arguments);
};

Queue.prototype.dequeue = function() {
  return this.items.shift();
}

Queue.prototype.front = function() {
  return this.items.length > 0 ? this.items[0] : undefined;
}

Queue.prototype.isEmpty = function() {
  return this.items.length === 0;
}

Queue.prototype.size = function() {
  return this.items.length;
}

Queue.prototype.print = function() {
  console.log(this.items.map(function(x) {
//     if (typeof x === 'object') {
//       return JSON.stringify(x).replace(/\"/g, "'");
//     }
    return x;
  }));
}

/**
 * Create a Priority Queue
 */
function PriorityQueue() {}

function PriorityElement(element, priority) {
  this.element = element;
  this.priority = priority;
}

PriorityQueue.prototype = new Queue();

PriorityQueue.prototype.enqueue = function(element, priority) {
  var item = new PriorityElement(element, priority);
  var added = false;
  for (var i = 0; i < this.items.length; i++) {
    if (item.priority < this.items[i].priority) {
      this.items.splice(i, 0, item);
      added = true;
      break;
    }
  }
  if (!added) this.items.push(item);
}

/**
 * Usage
 */

console.log('Queue usage')
var que = new Queue();
que.enqueue(2,3,4);
que.print();

console.log('Priority Queue usage')
var pque = new PriorityQueue();
pque.enqueue("jimmy", "2");
pque.enqueue("Ammy", "3")
pque.enqueue("Tommy", "1")
pque.print();
console.log('Who is at the front of the queue?', pque.front());

console.log('Circular Queue usage -- Hot Potato game');
function hotPotato(nameList, num) {
  var que = new Queue();
  que.enqueue.apply(que, nameList);
  que.print();
  
  while(que.size() > 1 ) {
    var i = num;
    while (i-- > 0) {
      que.enqueue(que.dequeue());
    }
    var dequed = que.dequeue();
    console.log(dequed + " was eliminated.")
  }
  return que.dequeue();
}

var nameList = ["Jimmy", "Ammy", "Tommy", "Elle", "Kara", "Hugo"];
var num = 20;
var winner = hotPotato(nameList, num);
console.log("The winner is " + winner);