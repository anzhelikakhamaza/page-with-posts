const titleInput = document.getElementById("taskInputTitle");
const descriptionInput = document.getElementById("taskInputDescription");
const addTaskButton = document.getElementById("addTaskBtn");

const taskContainer = document.getElementById("taskList");

titleInput.addEventListener("change", saveTitle);
descriptionInput.addEventListener("change", saveDescription);

addTaskButton.addEventListener("click", addTask);

function saveDescription() {
  const descriptionValue = descriptionInput.value;
  localStorage.setItem("savedDescription", descriptionValue);
}

function saveTitle() {
  const titleValue = titleInput.value;
  localStorage.setItem("savedTitle", titleValue);
}

function addTask() {
  const titleValue = titleInput.value;
  const descriptionValue = descriptionInput.value;

  if (titleValue && descriptionValue) {
    const taskTitleElement = document.createElement("div");
    taskTitleElement.classList.add("insertedTitle");
    taskTitleElement.innerHTML = titleValue;

    const taskDescriptionElement = document.createElement("div");
    taskDescriptionElement.classList.add("insertedDescription");
    taskDescriptionElement.innerHTML = descriptionValue;

    taskContainer.appendChild(taskTitleElement);
    taskContainer.appendChild(taskDescriptionElement);
  }
}
