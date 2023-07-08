"use strict";
const addItemButton = document.querySelector("#add-item");
const itemList = document.querySelector("#item-list");
const itemTextInput = document.querySelector("#item-text");
const deciderButton = document.querySelector("#select-item");
const mainCard = document.querySelector(".main-card");
const clearButton = document.querySelector("#clear-all");
const configButton = document.querySelector("#config-button");
const configMenu = document.querySelector("#config-menu");
const body = document.body;

let darkModePreferenceCheckbox = document.querySelector("#dark-mode-checkbox");
let numberOfItems = 0;
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
    const previousSelectedItem = itemList.querySelector("#selected-item");
    if (previousSelectedItem) previousSelectedItem.setAttribute("id", "");
    decisionTaken = false;
  } else {
  }
};

const addItem = () => {
  const itemText = itemTextInput.value;
  if (itemText !== "" && itemText !== null) {
    const newItem = document.createElement("div");
    newItem.classList.add("item");
    const itemTitle = document.createElement("span");
    itemTitle.innerText = itemText;
    newItem.appendChild(itemTitle);
    itemList.appendChild(newItem);
    const deleteItemButton = document.createElement("button");
    deleteItemButton.innerText = "-";
    deleteItemButton.classList.add("delete-item");
    newItem.appendChild(deleteItemButton);
    itemTextInput.value = "";
    const timeout = setTimeout(() => {
      newItem.classList.add("visible");
      clearTimeout(timeout);
    }, 1);
    numberOfItems++;
  }
};

const clearAllItems = () => {
  const items = itemList.querySelectorAll(".item");
  items.forEach((item) => {
    itemList.removeChild(item);
  });
  itemList.classList.remove("has-items");
  numberOfItems = 0;
};

const selectItem = async () => {
  if (decisionTaken) {
    const previousSelectedItem = itemList.querySelector("#selected-item");
    if (previousSelectedItem) previousSelectedItem.setAttribute("id", "");
    decisionTaken = false;
  }
  const animationsActivated = document.querySelector(
    "#animation-checkbox"
  ).checked;
  const items = itemList.querySelectorAll(".item");
  if (animationsActivated && numberOfItems > 0) {
    let pointer = 0;
    let numRolls = 6;
    if (numberOfItems > 5) {
      --numRolls;
    }
    if (numberOfItems > 10) {
      --numRolls;
    }
    let rolled = 0;
    while (rolled < numRolls) {
      items[pointer].classList.add(".highlighted");
      items[pointer].style.setProperty(
        "background",
        String(getRandomColourHex())
      );
      await sleep(100);
      items[pointer].classList.remove(".highlighted");
      items[pointer].style.setProperty("background", "");
      ++pointer;
      if (pointer >= numberOfItems) {
        pointer = 0;
        ++rolled;
      }
    }
  }

  if (numberOfItems > 0) {
    const selected = Math.floor(Math.random() * numberOfItems);
    items[selected]["id"] = "selected-item";
    decisionTaken = true;
  }
};

const deleteItem = (event) => {
  if (event.target.classList.contains("delete-item")) {
    itemList.removeChild(event.target.parentElement);
    --numberOfItems;
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

mainCard.addEventListener("click", deleteItem);
itemTextInput.addEventListener("focus", handleInputFocused);
deciderButton.addEventListener("click", selectItem);
document.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addItem();
  }
});
addItemButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearAllItems);
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
