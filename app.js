const gridContainer = document.getElementById("grid-container");
const clearBtn = document.getElementById("clear-grid");
const gridRange = document.getElementById("grid-range");
const colorPicker = document.getElementById("color-picker");
const defaultGridSize = 16;
const defaultColor = "#262626";
let gridSize = defaultGridSize;
let currentColor = defaultColor;

gridRange.onchange = (e) => updateGrid(e.target.value);
clearBtn.onclick = () => clearGrid();

function updateGrid(gridSize) {
  updateGridSize(gridSize);
  resetGrid();
  gridSetup(gridSize);
}

function updateGridSize(gridSize) {
  document.getElementById("size").innerText = `${gridSize} x ${gridSize}`;
}

function clearGrid() {
  document
    .querySelectorAll("#grid-container > div")
    .forEach((box) => (box.style.backgroundColor = "white"));
}
function resetGrid() {
  document.querySelector("#grid-container").innerHTML = "";
}

function gridSetup(gridSize) {
  gridContainer.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr)`;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const smallBox = document.createElement("div");
    smallBox.style.cssText = "border: solid 1px #000";
    smallBox.onmouseover = (e) =>
      (e.target.style.backgroundColor = changeColor());
    // smallBox.addEventListener("mouseover", function (e) {
    //   e.target.style.backgroundColor = "grey";
    // });
    gridContainer.appendChild(smallBox);
    updateGridSize(gridSize);
  }
}

function pickColor() {}
function pickShade() {}
function pickRainbow() {}
function changeColor() {
  return defaultColor;
}
gridSetup(gridSize);
