// --- Text controls





// --- GENERATE TABLE
function generateTableHead(table, data) {
  let tHead = table.createTHead();
  let row = tHead.insertRow();
  for (let key of data) {
    let th = document.createElement("TH");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

let table = document.querySelector(".table");

// Package locations, priors, and ease into a single object
const searchAreas = [];

for (let i = 0; i < locations.length; i++) {
  const searchArea = {
    "Location": locations[i],
    "Prior": priors[i],
    "Ease of Detection": easeOfDetection[i],
    "Expected Utility": Math.round((priors[i] * easeOfDetection[i] + Number.EPSILON) * 10000) / 10000
  };
  searchAreas.push(searchArea);
}

generateTable(table, searchAreas);
let searchKeys = Object.keys(searchAreas[0]);
generateTableHead(table, searchKeys);

// --- ADLIBS
let item = document.querySelector(".itemInput").value;

let randomItems = ["watch", "alarm clock", "Kermit the Frog muppet", "Nintendo DS",
"keys"];

randomItems = ["watch"];

if (item === null || item === "no" || item === "") {
  const randomIndex = Math.floor(Math.random() * randomItems.length);
  item = randomItems[randomIndex];
}

// Update all spans to say the item
itemSpans = document.getElementsByClassName("item");

for (let i = 0; i < itemSpans.length; i++) {
  itemSpans[i].innerHTML = item;
}

// --- MODAL
let itemBtn = document.querySelector(".itemBtn");

// Get the <span> element that closes the modal
let randomBtn = document.querySelector(".randomBtn");

// When user clicks button, fill in item
itemBtn.onclick = function () {
  let item = document.querySelector(".itemInput").value;

  if (item === null || item === "no" || item === "") {
    const randomIndex = Math.floor(Math.random() * randomItems.length);
    item = randomItems[randomIndex];
  }

  // Update all spans to say the item
  itemSpans = document.getElementsByClassName("item");

  for (let i = 0; i < itemSpans.length; i++) {
    itemSpans[i].innerHTML = item;
  }
}

// When the user clicks on <span> (x), close the modal
randomBtn.onclick = function () {
  const randomIndex = Math.floor(Math.random() * randomItems.length);
  item = randomItems[randomIndex];

  // Update all spans to say the item
  itemSpans = document.getElementsByClassName("item");

  for (let i = 0; i < itemSpans.length; i++) {
    itemSpans[i].innerHTML = item;
  }
}