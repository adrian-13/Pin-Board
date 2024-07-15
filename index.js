import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { openModal, closeModal } from "./modalWindow.js";
import { openDeletePinModal, closeDeletePinModal } from "./deletePin.js";
import { generateUUID } from "./generateUUID.js";

const appSettings = {
  databaseURL:
    "https://pin-board-28693-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const pinBoardRef = ref(database, "pinBoard");

const sendBtn = document.getElementById("send-btn");
const pinListEl = document.getElementById("pin-list");
const textAreaEl = document.getElementById("textarea-el");
const nameInput = document.getElementById("name-input");
const submitNameBtn = document.getElementById("submit-name-btn");
const deletePinBtn = document.getElementById("delete-pin-btn");

getUserUUID();

sendBtn.addEventListener("click", function () {
  addPinToBoard();
});

submitNameBtn.addEventListener("click", function () {
  const userName = nameInput.value.trim();
  const userUUID = generateUUID();
  console.log(userUUID);
  if (userName) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userUUID", userUUID);
    closeModal();
  } else {
    alert("Prosím, zadajte svoje meno.");
  }
});

function addPinToBoard() {
  let pinText = textAreaEl.value.trim();
  const userName = localStorage.getItem("userName");
  if (pinText !== "" && userName) {
    push(pinBoardRef, { text: pinText, author: userName });
  }
  textAreaEl.value = "";
}

onValue(pinBoardRef, function (snapshot) {
  if (snapshot.exists()) {
    clearPinBoard();
    snapshot.forEach((childSnapshot) => {
      const pinKey = childSnapshot.key;
      const pinData = childSnapshot.val();
      appendItemToPinBoard([pinKey, pinData.text, pinData.author]);
    });
  } else {
    pinListEl.innerHTML = "Nie sú tu žiadne poznámky...";
  }
});

function appendItemToPinBoard(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let itemAuthor = item[2];

  let newEl = document.createElement("li");

  // Vytvoríme element pre text poznámky
  let textEl = document.createElement("div");
  textEl.textContent = itemValue;
  textEl.className = "pin-text";

  // Vytvoríme element pre meno autora
  let authorEl = document.createElement("p");
  if (!itemAuthor) {
    authorEl.textContent = "Neznámy";
    authorEl.className = "pin-author";
  } else {
    authorEl.textContent = `${itemAuthor}`;
    authorEl.className = "pin-author";
  }

  // Pridáme text poznámky a meno autora do li elementu
  newEl.appendChild(authorEl);
  newEl.appendChild(textEl);

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `pinBoard/${itemID}`);
    if (itemAuthor !== authorEl.value) {
      openDeletePinModal();
      deletePinBtn.addEventListener("click", function () {
        remove(exactLocationOfItemInDB);
        closeDeletePinModal();
      });
    }
  });

  pinListEl.append(newEl);

  if (itemAuthor === localStorage.getItem("userName")) {
    authorEl.style.textAlign = "right";
  }
}

function clearPinBoard() {
  pinListEl.innerHTML = "";
}

function getUserUUID() {
  let userName = localStorage.getItem("userName");
  let userUuid = localStorage.getItem("userUUID");
  if (!userName || !userUuid) {
    openModal();
  }
  return userName && userUuid;
}
