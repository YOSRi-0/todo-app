class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class TodoListSLL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  clearCompletedTasks() {
    if (!this.head) return null;
    let current = this.head;
    while (current) {
      const taskIndex = current.data.id;
      const isChecked = current.data.element.querySelector(".checkbox").checked;
      if (isChecked) {
        const removedTask = this.remove(taskIndex);
        current = removedTask.next;
      } else {
        current = current.next;
      }
      this.updateTodoList();
      this.updateIndeces();
    }
  }
  updateTodoList() {
    const todoListEl = document.querySelector(".todo__items-list");
    let currentItem = this.head;
    todoListEl.innerHTML = "";
    while (currentItem) {
      todoListEl.appendChild(currentItem.data.element);
      currentItem = currentItem.next;
    }
  }

  addNewTodo() {
    const newTodoCheckboxEl = document.querySelector(".add-todo-checkbox");
    const checkboxAddIcon = newTodoCheckboxEl.nextElementSibling;
    const newTodoInputEl = document.querySelector(".todo__input");
    const deleteTodoEl = this.createDeleteIconEl(
      "img",
      "cross-icon",
      "./img/icon-cross.svg",
      "delete"
    );
    const newTodoEl = this.createNewTodoElement(
      newTodoCheckboxEl.checked,
      newTodoInputEl.value
    );
    newTodoEl.appendChild(deleteTodoEl);
    const newTodoObject = { id: null, element: newTodoEl };
    this.unshift(newTodoObject);
    newTodoCheckboxEl.checked = false;
    newTodoInputEl.value = "";
    checkboxAddIcon.style.display = "none";
    this.updateTodoList();
    this.updateIndeces();
    deleteTodoEl.addEventListener("click", (e) => {
      this.updateIndeces();
      this.remove(newTodoObject.id);
      e.target.parentElement.remove();
    });
  }

  createNewTodoElement(isCompleted, task) {
    const todoItemEl = this.createElement("div", "todo__item");
    const checkboxWrapper = this.createElement("div", "checkbox__wrapper");
    const checkboxEl = this.createElement("input", "checkbox", "checkbox");
    const checkedIcon = this.createCheckedIcon().querySelector("svg");
    const taskText = this.createElement("p", "todo__item-text", null, task);
    this.newTodoState(isCompleted, checkboxEl, checkedIcon, taskText);
    checkboxWrapper.appendChild(checkboxEl);
    checkboxWrapper.appendChild(checkedIcon);
    todoItemEl.appendChild(checkboxWrapper);
    todoItemEl.appendChild(taskText);
    return todoItemEl;
  }

  createDeleteIconEl(tag, className, src, alt) {
    const element = document.createElement(tag);
    element.className = className;
    element.setAttribute("src", src);
    element.setAttribute("alt", alt);
    return element;
  }

  createElement(tag, className, type = null, text = null) {
    const element = document.createElement(tag);
    element.className = className;
    type && element.setAttribute("type", type);
    text && (element.innerText = text);
    return element;
  }

  createCheckedIcon() {
    let element = document.createElement("div");
    element.innerHTML = `
    <svg
    class="checked-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="9"
              >
              <path
              fill="none"
              stroke="#FFF"
              stroke-width="2"
              d="M1 4.304L3.696 7l6-6"
              />
              </svg>`;
    return element;
  }
  newTodoState(isCompleted, checkboxEl, checkedIcon, taskText) {
    checkboxEl.checked = isCompleted;
    isCompleted && (checkedIcon.style.display = "block");
    isCompleted && taskText.classList.add("is-completed");
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

  updateIndeces() {
    if (!this.head) return null;
    let current = this.head;
    let counter = 0;
    while (current) {
      current.data.id = counter;
      counter++;
      current = current.next;
    }
  }
}
function updateUI() {
  isUpdatingUI = true;
  switchMode();
  isUpdatingUI = false;
}

let l = new TodoListSLL();
const input = document.querySelector(".todo__input");
input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    if (event.target.value.trim().length) {
      l.addNewTodo();
      manageCheckbox();
      updateUI();
    }
  }
});
const clearCompletedTasksEl = document.querySelector(".btn-cc");
clearCompletedTasksEl.addEventListener("click", (e) => {
  e.preventDefault();
  l.clearCompletedTasks();
});
