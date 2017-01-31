class LinkedList {
  head
  
  constructor() {
    this.head = null
  }
  
  add(value) {
    const node = {
      value: value,
      next: null
    }
    let current;
    if (this.head === null) {
      this.head = node
    } else {
      current = this.head
      while(current.next) {
        current = current.next
      }
      current.next = node
    }
    return node
  }
  
  remove(node) {
    let current, value = node.value
    if (this.head !== null) {
      if (this.head === node) {
        this.head = this.head.next
        node.next = null
        return value
      }
      current = this.head
      while(current.next) {
        if (current.next === node) {
          current = node.next
          return value
        }
        current = current.next
      }
    }
  }
}

const linkedList = new LinkedList()
const node1 = linkedList.add(3)
const node2 = linkedList.add(19)
console.log(node1, node2)
console.log(linkedList)
linkedList.remove(node1)
console.log(linkedList)