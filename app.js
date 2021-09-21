const gridContainer = document.getElementById("grid-container");
const clearBtn = document.getElementById("clear-grid");
const gridRange = document.getElementById("grid-range");
const colorPicker = document.getElementById("color-picker");
const shadePicker = document.getElementById("shade-picker");
const rainbowPicker = document.getElementById("rainbow-picker");

const defaultGridSize = 16;
const defaultColor = "#262626";
const defaultMode = "color-picker";

let gridSize = defaultGridSize;
let currentColor = defaultColor;
let currentMode = defaultMode;

gridRange.onchange = (e) => updateGrid(e.target.value);
clearBtn.onclick = () => clearGrid();
colorPicker.onchange = (e) => pickColor(e.target.value);
colorPicker.onclick = () => changeColor("color");
shadePicker.onclick = () => changeColor("shade");
rainbowPicker.onclick = () => changeColor("rainbow");

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
    smallBox.onmouseover = (e) => {
      let color = e.target.style.backgroundColor;
      e.target.style.backgroundColor = changeColor(color);
    };
    gridContainer.appendChild(smallBox);
    updateGridSize(gridSize);
  }
}

function pickColor(color) {
  return color;
}

function pickShade(color) {
  let num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * 10),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

function pickRainbow() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function pickMode(mode) {
  switch (mode) {
    case "color":
      return pickColor();
    case "shade":
      return pickShade();
    case "rainbow":
      return pickRainbow();
    default:
      return defaultColor;
  }
}
gridSetup(gridSize);
console.log(pickRainbow());
console.log(pickShade("#252525"));
