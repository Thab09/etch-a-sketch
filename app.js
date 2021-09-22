const gridContainer = document.getElementById("grid-container");
const clearBtn = document.getElementById("clear-grid");
const gridRange = document.getElementById("grid-range");
const colorPicker = document.getElementById("color-picker");
const shadePicker = document.getElementById("shade-picker");
const rainbowPicker = document.getElementById("rainbow-picker");
const eraserPicker = document.getElementById("eraser-picker");

const defaultGridSize = 16;
const defaultColor = "#262626";
const defaultMode = "color";

let gridSize = defaultGridSize;
let currentColor = defaultColor;
let currentMode = defaultMode;

function setCurrentColor(color) {
  currentColor = color;
}

function setCurrentMode(mode) {
  currentMode = mode;
  activateMode(mode);
}

gridRange.onmousemove = (e) => updateGridSize(e.target.value);
gridRange.onchange = (e) => updateGrid(e.target.value);
clearBtn.onclick = () => clearGrid();
colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorPicker.onclick = () => setCurrentMode("color");
shadePicker.onclick = () => setCurrentMode("shade");
rainbowPicker.onclick = () => setCurrentMode("rainbow");
eraserPicker.onclick = () => setCurrentMode("eraser");

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
    smallBox.style.cssText =
      "border: solid 1px #000; background-color: #ffffff;";
    smallBox.onmouseover = (e) => {
      let color = e.target.style.backgroundColor;
      let hexColor = RGBToHex(color);
      e.target.style.backgroundColor = changeColor(hexColor);
    };
    gridContainer.appendChild(smallBox);
    updateGridSize(gridSize);
  }
}

function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
//changecolor function should not have parenthesis,
//take from current mode (if elseif || switch)
function changeColor(color) {
  switch (currentMode) {
    case "color":
      setCurrentColor(colorPicker.value);
      return currentColor;
    case "shade":
      setCurrentColor(darken(color, 10));
      return currentColor;
    case "rainbow":
      return pickRainbow();
    case "eraser":
      setCurrentColor("#ffffff");
      return currentColor;
  }
}

function activateMode(mode) {
  if (mode === "color") {
    colorPicker.classList.add("active");
    shadePicker.classList.remove("active");
    rainbowPicker.classList.remove("active");
    eraserPicker.classList.remove("active");
  } else if (mode === "shade") {
    colorPicker.classList.remove("active");
    shadePicker.classList.add("active");
    rainbowPicker.classList.remove("active");
    eraserPicker.classList.remove("active");
  } else if (mode === "rainbow") {
    colorPicker.classList.remove("active");
    shadePicker.classList.remove("active");
    rainbowPicker.classList.add("active");
    eraserPicker.classList.remove("active");
  } else if (mode === "eraser") {
    colorPicker.classList.remove("active");
    shadePicker.classList.remove("active");
    rainbowPicker.classList.remove("active");
    eraserPicker.classList.add("active");
  } else {
    console.log("activateMode has a problem");
  }
}

const subtractLight = function (color, amount) {
  let cc = parseInt(color, 16) - amount;
  let c = cc < 0 ? 0 : cc;
  c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
  return c;
};

function darken(color, amount) {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = parseInt((255 * amount) / 100);
  return (color = `#${subtractLight(
    color.substring(0, 2),
    amount
  )}${subtractLight(color.substring(2, 4), amount)}${subtractLight(
    color.substring(4, 6),
    amount
  )}`);
}

function pickRainbow() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

gridSetup(gridSize);
