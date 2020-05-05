"use strict";
const addTaskButton = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const taskTextInput = document.querySelector("#task-text");
const deciderButton = document.querySelector("#select-task");
const mainCard = document.querySelector(".main-card");
const animationsActivated = document.querySelector("#animation-checkbox").checked;
let numberOfTasks = 0;
let decisionTaken = false;

function getRandomColourHex() {
  let R = Math.floor(Math.random() * 256).toString(16);
  R.length === 2 ? R = R : R = "0" + R;
  let G = Math.floor(Math.random() * 256).toString(16);
  G.length === 2 ? G = G : G = "0" + G;
  let B = Math.floor(Math.random() * 256).toString(16);
  B.length === 2 ? B = B : B = "0" + B;
  const hex = "#" + R + G + B;
  return hex;
}

function sleep(duration) {
  return new Promise(function (resolve) { setTimeout(resolve, duration) })
}

const handleInputFocused = () => {
  if (decisionTaken) {
    const previousSelectedTask = taskList.querySelector(".selected-task");
    previousSelectedTask.classList.remove("selected-task");
  }else{
  }
};

const addTask = () => {
  const taskText = taskTextInput.value;
  if (taskText != "" && taskText != null) {
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.innerText = taskText;
    taskList.appendChild(newTask);
    const deleteTaskSpan = document.createElement("span");
    deleteTaskSpan.innerText = "-";
    deleteTaskSpan.classList.add("delete-task");
    newTask.appendChild(deleteTaskSpan);
    taskTextInput.value = "";
    numberOfTasks++;
  }
};

const selectTask = async () => {
  if (decisionTaken) {
    const previousSelectedTask = taskList.querySelector(".selected-task");
    previousSelectedTask.classList.remove("selected-task");
  }
  const tasks = taskList.querySelectorAll(".task");
  if(animationsActivated){
    let pointer = 0;
    const numRolls = 6;
    let rolled = 0;
    while(rolled < numRolls){
      tasks[pointer].classList.add(".highlighted");
      tasks[pointer].style.setProperty("background", String(getRandomColourHex()));
      await sleep(100);
      tasks[pointer].classList.remove(".highlighted");
      tasks[pointer].style.setProperty("background", "");
      ++pointer;
      if(pointer >= numberOfTasks){
        pointer = 0;
        ++rolled;
      }

    }
  }
  
  const selected = Math.floor(Math.random() * numberOfTasks);
  tasks[selected].classList.add("selected-task");
  decisionTaken = true;
};

const deleteTask = (event) => {
  if(event.target.classList.contains("delete-task")){    
    taskList.removeChild(event.target.parentElement);
    --numberOfTasks;
  }
}


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
