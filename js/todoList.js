class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class ToDoListSLL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(data) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    return this;
  }
  pop() {
    if (!this.head) return null;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    newTail.next = null;
    this.tail = newTail;
    this.size--;
    if (this.size === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
  shift() {
    if (!this.head) return null;
    let currentHead = this.head;
    this.head = currentHead.next;
    this.size--;
    if (this.length === 0) {
      this.tail = null;
    }
    return currentHead;
  }
  unshift(data) {
    let newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.size) return null;
    let counter = 0;
    let current = this.head;
    while (index !== counter) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(index, data) {
    let foundNode = this.get(index);
    if (foundNode) {
      foundNode.data = data;
      return true;
    }
    return false;
  }
  insert(index, data) {
    if (index < 0 || index > this.size) return false;
    if (index === this.length) return !!this.push(data);
    if (index === 0) return !!this.unshift(data);

    let newNode = new Node(data);
    let prev = this.get(index - 1);
    let temp = prev.next;
    prev.next = newNode;
    newNode.next = temp;
    this.size++;
    return true;
  }
  remove(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    let prevNode = this.get(index - 1);
    let removed = prevNode.next;
    prevNode.next = removed.next;
    this.size--;
    return removed;
  }
  traverse() {
    if (!this.head) return null;
    let current = this.head;
    const res = [];
    while (current) {
      res.push(current.data);
      current = current.next;
    }
    return res;
  }
}

let l = new ToDoListSLL();
l.push("1");
l.unshift("0");
l.push("2");
l.push("3");
l.push("4");
l.push("5");
console.log(l.traverse());
const swapped = l.remove(2);
l.insert(4, swapped.data);
console.log(l.traverse());
