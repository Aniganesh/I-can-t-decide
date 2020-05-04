"use strict";
const addTaskButton = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const taskTextInput = document.querySelector("#task-text");
const deciderButton = document.querySelector("#select-task");
const mainCard = document.querySelector(".main-card");
let numberOfTasks = 0;
let decisionTaken = false;


const handleInputFocused = () => {
  if (decisionTaken) {
    const previousSelectedTask = taskList.querySelector(".selected-task");
    previousSelectedTask.classList.remove("selected-task");
    console.log("Done");
  }else{
    console.log("No decisionTaken");
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

const selectTask = () => {
  if (decisionTaken) {
    const previousSelectedTask = taskList.querySelector(".selected-task");
    previousSelectedTask.classList.remove("selected-task");
  }
  const tasks = taskList.querySelectorAll(".task");
  const selected = Math.floor(Math.random() * numberOfTasks);
  tasks[selected].classList.add("selected-task");
  decisionTaken = true;
};

const deleteTask = (event) => {
  if(event.target.classList.contains("delete-task")){    
    taskList.removeChild(event.target.parentElement);
  }
}

mainCard.addEventListener("click", deleteTask);
taskTextInput.addEventListener("focus", handleInputFocused);
deciderButton.addEventListener("click", selectTask);
document.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addTask();
  }
});
addTaskButton.addEventListener("click", addTask);
