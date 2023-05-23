"use strict";
const addTaskButton = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const taskTextInput = document.querySelector("#task-text");
const deciderButton = document.querySelector("#select-task");
const mainCard = document.querySelector(".main-card");
const clearButton = document.querySelector("#clear-all");
const configButton = document.querySelector("#config-button");
const configMenu = document.querySelector("#config-menu");
const body = document.body;

let darkModePreferenceCheckbox = document.querySelector("#dark-mode-checkbox");
let numberOfTasks = 0;
let decisionTaken = false;

function getRandomColourHex() {
  let R = Math.floor(Math.random() * 256).toString(16);
  R.length === 2 ? (R = R) : (R = "0" + R);
  let G = Math.floor(Math.random() * 256).toString(16);
  G.length === 2 ? (G = G) : (G = "0" + G);
  let B = Math.floor(Math.random() * 256).toString(16);
  B.length === 2 ? (B = B) : (B = "0" + B);
  const hex = "#" + R + G + B;
  return hex;
}

function sleep(duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
}

const onLoad = () => {
  if (darkModePreferenceCheckbox.checked) {
    darkModeOn();
  } else {
    darkModeOff();
  }
};

const darkModeOff = () => {
  if (document.querySelector("body").classList.contains("dark-mode")) {
    document.querySelector("body").classList.remove("dark-mode");
  }
  return;
};

const darkModeOn = () => {
  if (!document.querySelector("body").classList.contains("dark-mode")) {
    document.querySelector("body").classList.add("dark-mode");
  }
  return;
};

const handleInputFocused = () => {
  if (decisionTaken) {
    const previousSelectedTask = taskList.querySelector("#selected-task");
    if (previousSelectedTask) previousSelectedTask.setAttribute("id", "");
    decisionTaken = false;
  } else {
  }
};

const addTask = () => {
  const taskText = taskTextInput.value;
  if (taskText !== "" && taskText !== null) {
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    const taskTitle = document.createElement("span");
    taskTitle.innerText = taskText;
    newTask.appendChild(taskTitle);
    taskList.appendChild(newTask);
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerText = "-";
    deleteTaskButton.classList.add("delete-task");
    newTask.appendChild(deleteTaskButton);
    taskTextInput.value = "";
    const timeout = setTimeout(() => {
      newTask.classList.add("visible");
      clearTimeout(timeout);
    }, 1);
    numberOfTasks++;
  }
};

const clearAllTasks = () => {
  const tasks = taskList.querySelectorAll(".task");
  tasks.forEach((task) => {
    taskList.removeChild(task);
  });
  taskList.classList.remove("has-tasks");
  numberOfTasks = 0;
};

const selectTask = async () => {
  if (decisionTaken) {
    const previousSelectedTask = taskList.querySelector("#selected-task");
    if (previousSelectedTask) previousSelectedTask.setAttribute("id", "");
    decisionTaken = false;
  }
  const animationsActivated = document.querySelector(
    "#animation-checkbox"
  ).checked;
  const tasks = taskList.querySelectorAll(".task");
  if (animationsActivated && numberOfTasks > 0) {
    let pointer = 0;
    let numRolls = 6;
    if (numberOfTasks > 5) {
      --numRolls;
    }
    if (numberOfTasks > 10) {
      --numRolls;
    }
    let rolled = 0;
    while (rolled < numRolls) {
      tasks[pointer].classList.add(".highlighted");
      tasks[pointer].style.setProperty(
        "background",
        String(getRandomColourHex())
      );
      await sleep(100);
      tasks[pointer].classList.remove(".highlighted");
      tasks[pointer].style.setProperty("background", "");
      ++pointer;
      if (pointer >= numberOfTasks) {
        pointer = 0;
        ++rolled;
      }
    }
  }

  if (numberOfTasks > 0) {
    const selected = Math.floor(Math.random() * numberOfTasks);
    tasks[selected]["id"] = "selected-task";
    decisionTaken = true;
  }
};

const deleteTask = (event) => {
  if (event.target.classList.contains("delete-task")) {
    taskList.removeChild(event.target.parentElement);
    --numberOfTasks;
  }
};

const handleConfigButtonClick = () => {
  if (configMenu.classList.contains("visible")) {
    configMenu.classList.remove("visible");
  } else {
    configMenu.classList.add("visible");
  }
};

/**
 * @param {MouseEvent} e
 */
const handleBodyClick = (e) => {
  if (!configMenu.classList.contains("visible")) return;

  if (
    e.target.id !== "config-menu" &&
    e.target.id !== "config-button" &&
    e.target?.parentElement.id !== "config-button" &&
    e.target?.parentElement.parentElement.id !== "config-button"
  ) {
    configMenu.classList.remove("visible");
  }
};

// Event Listeners

mainCard.addEventListener("click", deleteTask);
taskTextInput.addEventListener("focus", handleInputFocused);
deciderButton.addEventListener("click", selectTask);
document.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addTask();
  }
});
addTaskButton.addEventListener("click", addTask);
clearButton.addEventListener("click", clearAllTasks);
document.addEventListener("load", onLoad);
document.addEventListener("DOMContentLoaded", onLoad);
darkModePreferenceCheckbox.addEventListener("change", (event) => {
  if (!event.target.checked) {
    darkModeOff();
  } else {
    darkModeOn();
  }
});
configButton.addEventListener("click", handleConfigButtonClick);
body.addEventListener("click", handleBodyClick);
