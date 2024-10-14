const titleInput = document.getElementById("taskInputTitle");
const descriptionInput = document.getElementById("taskInputDescription");
const addTaskButton = document.getElementById("addTaskBtn");

const taskContainer = document.getElementById("taskList");

addTaskButton.addEventListener("click", addTask);

let toDos = [];

function addTask() {
  const newToDo = {
    title: titleInput.value,
    description: descriptionInput.value,
  };

  toDos.push(newToDo);

  taskContainer.replaceChildren();

  drawToDos();
  setToDosToLocalStorage();
}

function drawToDos() {
  for (let i = 0; i < toDos.length; i++) {
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

    deleteButtonWrapper.setAttribute("id", i);
    editButtonWrapper.setAttribute("id", i);

    deleteButtonWrapper.addEventListener("click", function () {
      deleteTask(i);
    });

    editButtonWrapper.addEventListener("click", function () {
      editTask(i);
    });

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

  let insertedTitle = document.getElementsByClassName("insertedTitle")[taskId];
  let insertedDescription = document.getElementsByClassName(
    "insertedDescription"[taskId]
  );

  insertedTitle[currentTask].style.visibility = "hidden";
  insertedDescription[currentTask].style.visibility = "hidden";

  const editTitleWrapper = document.createElement("textarea");
  editTitleWrapper.classList.add("editTitle");
  editTitleWrapper.value = currentTask.title;

  const editDescriptionWrapper = document.createElement("textarea");
  editDescriptionWrapper.classList.add("editDescription");
  editDescriptionWrapper.value = currentTask.description;

  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";

  saveButton.addEventListener("click", function () {
    toDos[taskId].title = editTitleWrapper.value;
    toDos[taskId].description = editDescriptionWrapper.value;
    setToDosToLocalStorage();

    taskContainer.replaceChildren();
    drawToDos();
  });

  let parentElement = insertedTitle.parentNode;

  parentElement.insertBefore(editTitleWrapper, insertedTitle);
  parentElement.insertBefore(editDescriptionWrapper, insertedDescription);
  parentElement.insertBefore(saveButton, insertedDescription);
}
