const titleInput = document.getElementById("taskInputTitle");
const descriptionInput = document.getElementById("taskInputDescription");
const addTaskButton = document.getElementById("addTaskBtn");
const prioritySort = document.getElementById("prioritySort");
const prioritySelect = document.getElementById("prioritySelect");
const taskContainer = document.getElementById("taskList");
const container = document.getElementById("container");
const toggle = document.getElementById("toggle");

addTaskButton.addEventListener("click", addTask);
prioritySort.addEventListener("change", sortTasks);
toggle.addEventListener("change", switchToggle);

let todos = [];
let originalTodos = [];

function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTheArray() {
  saveTodosToLocalStorage();

  taskContainer.replaceChildren();
  renderTodos();
}

function switchToggle() {
  document.body.classList.toggle("darkTheme", toggle.checked);
}

function addTask() {
  const newTodo = {
    title: titleInput.value,
    description: descriptionInput.value,
    priority: prioritySelect.value,
    isChecked: false,
  };

  todos.push(newTodo);
  originalTodos = todos.slice();

  updateTheArray();

  titleInput.value = "";
  descriptionInput.value = "";
}

function createElement(tag, className = "", content = "") {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (content) element.innerHTML = content;
  return element;
}

function renderTodos() {
  for (let i = 0; i < todos.length; i++) {
    const priorityWrapper = createElement(
      "div",
      "selectedPriority",
      todos[i].priority
    );
    const titleWrapper = createElement("div", "insertedTitle", todos[i].title);
    const descriptionWrapper = createElement(
      "div",
      "insertedDescription",
      todos[i].description
    );
    const deleteButton = createElement("button", "deleteTask", "Delete");
    const editButton = createElement("button", "editButton", "Edit");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = todos[i].isChecked;

    if (todos[i].isChecked) {
      checkbox.setAttribute("checked", "checked");

      titleWrapper.classList.toggle("completed");
      descriptionWrapper.classList.toggle("completed");
      deleteButton.classList.toggle("button-disabled");
      editButton.classList.toggle("button-disabled");
    }

    deleteButton.addEventListener("click", () => deleteTask(i));
    editButton.addEventListener("click", () => editTask(i));
    checkbox.addEventListener("click", () => toggleTaskCompletion(i));

    taskContainer.append(
      checkbox,
      priorityWrapper,
      titleWrapper,
      descriptionWrapper,
      editButton,
      deleteButton
    );
  }
}

function deleteTask(taskId) {
  todos.splice(taskId, 1);

  updateTheArray();
}

function loadTodosFromLocalStorage() {
  let savedData = localStorage.getItem("todos");

  if (savedData) {
    todos = JSON.parse(savedData);
    originalTodos = [...todos];

    taskContainer.replaceChildren();
    renderTodos();
  }
}

window.onload = loadTodosFromLocalStorage;

function editTask(taskId) {
  let currentTask = todos[taskId];

  titleInput.value = currentTask.title;
  descriptionInput.value = currentTask.description;

  const inputContainer = document.querySelector(".task-input-container");
  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  inputContainer.appendChild(saveButton);

  addTaskButton.style.display = "none";

  saveButton.addEventListener("click", function () {
    todos[taskId].title = titleInput.value;
    todos[taskId].description = descriptionInput.value;

    updateTheArray();

    saveButton.style.display = "none";
    titleInput.value = "";
    descriptionInput.value = "";

    addTaskButton.style.display = "block";
  });
}

function toggleTaskCompletion(index) {
  let currentTodo = todos[index];
  currentTodo.isChecked = !currentTodo.isChecked;

  let titleWrapper = document.getElementsByClassName("insertedTitle")[index];
  let descriptionWrapper = document.getElementsByClassName(
    "insertedDescription"
  )[index];
  let deleteButton = document.getElementsByClassName("deleteTask")[index];
  let editButton = document.getElementsByClassName("editButton")[index];

  titleWrapper.classList.toggle("completed");
  descriptionWrapper.classList.toggle("completed");
  deleteButton.classList.toggle("button-disabled");
  editButton.classList.toggle("button-disabled");

  saveTodosToLocalStorage();
}

function sortTasks() {
  let selectedPriority = prioritySort.value.toLowerCase();

  if (selectedPriority === "none") {
    todos = [...originalTodos];
  } else {
    todos.sort((a, b) => (a.priority === selectedPriority ? -1 : 1));
  }

  updateTheArray();
}
