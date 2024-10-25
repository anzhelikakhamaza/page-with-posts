// DOM Elements
const titleInput = document.getElementById("taskInputTitle");
const descriptionInput = document.getElementById("taskInputDescription");
const addTaskButton = document.getElementById("addTaskBtn");
const prioritySort = document.getElementById("prioritySort");
const prioritySelect = document.getElementById("prioritySelect");
const taskContainer = document.getElementById("taskList");
const toggle = document.getElementById("toggle-checkbox");

// Event Listeners
titleInput.addEventListener("input", disableAddTaskButton);
addTaskButton.addEventListener("click", validateValue);
prioritySort.addEventListener("change", sortTasks);
toggle.addEventListener("change", switchToggle);

// Variables
let todos = [];
let originalTodos = [];
let currentTaskID = 0;

// Functions
function disableAddTaskButton() {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity(
      `Title should be at least ${titleInput.minLength} characters; you entered ${titleInput.value.length}.`
    );
  } else {
    titleInput.setCustomValidity("");
  }

  titleInput.reportValidity();
}

function validateValue(event) {
  disableAddTaskButton();

  if (!titleInput.validity.valid) {
    event.preventDefault();
    return;
  }

  addTask();
}

function addTask() {
  const newTodo = {
    title: titleInput.value,
    description: descriptionInput.value,
    priority: prioritySelect.value,
    isChecked: false,
  };

  todos.push(newTodo);
  originalTodos = [...todos];

  updateTheArray();
  hideSorting();

  titleInput.value = "";
  descriptionInput.value = "";
}

function updateTheArray() {
  saveTodosToLocalStorage();
  renderTodos();
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem(
    "theme",
    document.body.classList.contains("darkTheme" ? "darkTheme" : "light")
  );
}

function loadTodosFromLocalStorage() {
  let savedData = localStorage.getItem("todos");
  let savedTheme = localStorage.getItem("theme");

  if (savedData) {
    todos = JSON.parse(savedData);
    originalTodos = [...todos];

    renderTodos();
  }

  if (savedTheme) {
    renderTodos();
  }
}

function createElement(tag, className = "", content = "", type = "") {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  if (content) element.innerHTML = content;
  if (type) element.type = type;
  return element;
}

function renderTodos() {
  taskContainer.replaceChildren();

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
    const checkbox = createElement("input", "checkbox", "", "checkbox");

    checkbox.checked = todos[i].isChecked;

    if (todos[i].isChecked) {
      checkbox.setAttribute("checked", "checked");
      toggleTaskCompletionStyles(
        titleWrapper,
        descriptionWrapper,
        deleteButton,
        editButton
      );
      editButton.disabled = true;
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

function editTask(taskId) {
  currentTaskID = taskId;
  let currentTask = todos[taskId];

  titleInput.value = currentTask.title;
  descriptionInput.value = currentTask.description;

  const inputContainer = document.querySelector(".task-input-container");
  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  inputContainer.appendChild(saveButton);

  addTaskButton.style.display = "none";
}

saveButton.addEventListener("click", function () {
  if (currentTaskID !== null || currentTaskID !== undefined) {
    todos[currentTaskID].title = titleInput.value;
    todos[currentTaskID].description = descriptionInput.value;

    updateTheArray();

    saveButton.remove();
    titleInput.value = "";
    descriptionInput.value = "";

    addTaskButton.style.display = "block";
  }
});

function toggleTaskCompletion(index) {
  let currentTodo = todos[index];
  currentTodo.isChecked = !currentTodo.isChecked;

  let titleWrapper = document.getElementsByClassName("insertedTitle")[index];
  let descriptionWrapper = document.getElementsByClassName(
    "insertedDescription"
  )[index];
  let deleteButton = document.getElementsByClassName("deleteTask")[index];
  let editButton = document.getElementsByClassName("editButton")[index];

  toggleTaskCompletionStyles(
    titleWrapper,
    descriptionWrapper,
    deleteButton,
    editButton
  );
  saveTodosToLocalStorage();
}

function toggleTaskCompletionStyles(
  titleWrapper,
  descriptionWrapper,
  deleteButton,
  editButton
) {
  titleWrapper.classList.toggle("completed");
  descriptionWrapper.classList.toggle("completed");
  deleteButton.classList.toggle("button-disabled");
  editButton.classList.toggle("button-disabled");
}

function sortTasks() {
  let selectedPriority = prioritySort.value.toLowerCase();

  if (selectedPriority === "none") {
    originalTodos = [...todos];
  } else {
    todos.sort((a, b) => (a.priority === selectedPriority ? -1 : 1));
  }

  updateTheArray();
}

function switchToggle() {
  document.body.classList.toggle("darkTheme", toggle.checked);
}

function hideSorting() {
  prioritySort.style.display =
    prioritySort.style.display === "none" ? "block" : "none";
}

// Load todos on page load
window.onload = loadTodosFromLocalStorage;
