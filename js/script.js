const titleInput = document.getElementById("taskInputTitle");
const descriptionInput = document.getElementById("taskInputDescription");
const addTaskButton = document.getElementById("addTaskBtn");
const sortPriorities = document.getElementById("priotitySort");
const selectPriotity = document.getElementById("priotitySelect");

const taskContainer = document.getElementById("taskList");

addTaskButton.addEventListener("click", addTask);

sortPriorities.addEventListener("click", sortingTasks);

let toDos = [];

function addTask() {
  const newToDo = {
    title: titleInput.value,
    description: descriptionInput.value,
    priority: selectPriotity.value,
  };

  toDos.push(newToDo);

  taskContainer.replaceChildren();

  drawToDos();
  setToDosToLocalStorage();

  titleInput.value = "";
  descriptionInput.value = "";
}

function drawToDos() {
  for (let i = 0; i < toDos.length; i++) {
    const selectWrapper = document.createElement("div");
    selectWrapper.classList.add("selectedPriority");
    selectWrapper.innerHTML = toDos[i].priority;

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("insertedTitle");
    titleWrapper.innerHTML = toDos[i].title;

    const descriptionWrapper = document.createElement("div");
    descriptionWrapper.classList.add("insertedDescription");
    descriptionWrapper.innerHTML = toDos[i].description;

    const deleteButtonWrapper = document.createElement("button");
    deleteButtonWrapper.classList.add("deleteTask");
    deleteButtonWrapper.innerText = "Delete";

    const editButtonWrapper = document.createElement("button");
    editButtonWrapper.classList.add("editButton");
    editButtonWrapper.innerText = "Edit";

    const checkboxWrapper = document.createElement("input");
    checkboxWrapper.type = "checkbox";
    checkboxWrapper.classList.add("checkbox");

    deleteButtonWrapper.addEventListener("click", () => deleteTask(i));
    editButtonWrapper.addEventListener("click", () => editTask(i));
    checkboxWrapper.addEventListener("click", () => checkBox(i));

    taskContainer.appendChild(checkboxWrapper);
    taskContainer.appendChild(selectWrapper);

    taskContainer.appendChild(titleWrapper);
    taskContainer.appendChild(descriptionWrapper);

    taskContainer.appendChild(editButtonWrapper);
    taskContainer.appendChild(deleteButtonWrapper);
  }
}

function deleteTask(taskId) {
  toDos.splice(taskId, 1);

  setToDosToLocalStorage();

  taskContainer.replaceChildren();
  drawToDos();
}

function setToDosToLocalStorage() {
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function getToDosToLocalStorage() {
  let enteredData = localStorage.getItem("toDos");

  if (enteredData) {
    toDos = JSON.parse(enteredData);
    taskContainer.replaceChildren();
    drawToDos();
  }
}
window.onload = getToDosToLocalStorage;

function editTask(taskId) {
  let currentTask = toDos[taskId];

  titleInput.value = currentTask.title;
  descriptionInput.value = currentTask.description;

  const saveButtonWrapper = document.querySelector(".task-input-container");
  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButtonWrapper.appendChild(saveButton);

  addTaskButton.style.display = "none";

  saveButton.addEventListener("click", function () {
    toDos[taskId].title = titleInput.value;
    toDos[taskId].description = descriptionInput.value;
    setToDosToLocalStorage();

    taskContainer.replaceChildren();
    drawToDos();

    saveButton.style.display = "none";
    titleInput.value = "";
    descriptionInput.value = "";

    addTaskButton.style.display = "block";
  });
}

function checkBox(i) {
  let titleWrapper = document.getElementsByClassName("insertedTitle")[i];
  let descriptionWrapper = document.getElementsByClassName(
    "insertedDescription"
  )[i];
  let deleteButtonWrapper = document.getElementsByClassName("deleteTask")[i];
  let editButtonWrapper = document.getElementsByClassName("editButton")[i];

  titleWrapper.classList.toggle("completed");
  descriptionWrapper.classList.toggle("completed");
  deleteButtonWrapper.classList.toggle("button-disabled");
  editButtonWrapper.classList.toggle("button-disabled");

  setToDosToLocalStorage();
}

function sortingTasks() {
  const priorityObject = {
    high: 1,
    medium: 2,
    low: 3,
  };

  if (sortPriorities.value === "1") {
    toDos.sort(
      (a, b) => priorityObject[a.priority] - priorityObject[b.priority]
    );
  } else if (sortPriorities.value === "2") {
    toDos.sort(
      (a, b) => priorityObject[b.priority] - priorityObject[a.priority]
    );
  }

  setToDosToLocalStorage();

  taskContainer.replaceChildren();
  drawToDos();
}
