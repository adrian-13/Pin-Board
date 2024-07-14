import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "YOUR_FIREBASE_DATABASE_URL",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const pinBoardRef = ref(database, "pinBoard");

const sendBtn = document.getElementById("send-btn");
const pinListEl = document.getElementById("pin-list");
const textAreaEl = document.getElementById("textarea-el");

sendBtn.addEventListener("click", function () {
  addPinToBoard();
});

function addPinToBoard() {
  let pinText = textAreaEl.value.trim();
  if (pinText !== "") {
    push(pinBoardRef, { text: pinText });
  }
  textAreaEl.value = "";
}

onValue(pinBoardRef, function (snapshot) {
  if (snapshot.exists()) {
    clearPinBoard();
    snapshot.forEach((childSnapshot) => {
      const pinKey = childSnapshot.key;
      const pinData = childSnapshot.val();
      appendItemToPinBoard([pinKey, pinData.text]);
    });
  } else {
    pinListEl.innerHTML = "Nie sú tu žiadné poznámky...";
  }
});

function appendItemToPinBoard(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `pinBoard/${itemID}`);
    remove(exactLocationOfItemInDB);
  });

  pinListEl.append(newEl);
}

function clearPinBoard() {
  pinListEl.innerHTML = "";
}
