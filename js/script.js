const titleInput = document.getElementById("taskInputTitle");
const descriptionInput = document.getElementById("taskInputDescription");
const addTaskButton = document.getElementById("addTaskBtn");

const deleteButtonContainer = document.getElementById("button-container");
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

  drawToDoes();
  setToDoesToLocalStorage();
  deleteToDoes();
}

function drawToDoes() {
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

    deleteButtonWrapper.addEventListener("click", function () {
      deleteTask(i);
    });

    deleteButtonContainer.appendChild(deleteButtonWrapper);
    taskContainer.appendChild(titleWrapper);
    taskContainer.appendChild(descriptionWrapper);
  }
}

function deleteTask(index) {
  toDos.splice(index, 1);

  addTask();
}

function setToDoesToLocalStorage() {
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function getToDoesToLocalStorage() {
  let enteredData = localStorage.getItem("toDos");

  if (enteredData) {
    toDos = JSON.parse(enteredData);
    taskContainer.replaceChildren();
    drawToDoes();
  }
}

window.onload = getToDoesToLocalStorage;
