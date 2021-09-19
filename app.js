const gridContainer = document.getElementById("grid-container");
const clearBtn = document.getElementById("clear-grid");
const rangeSize = document.getElementById("range-size");
const gridRange = document.getElementById("grid-range");
const defaultGridSize = 16;
let gridSize = defaultGridSize;
//add mouseover to gridsize change
//cleargrid
//use onchange to call updategrid which updates size and calls gridsetup
gridRange.onchange = (e) => gridSetup(e.target.value);
clearBtn.onclick = () => clearGrid();

function updateGridSize(gridSize) {
  document.getElementById("size").innerText = `${gridSize} x ${gridSize}`;
}

function gridSetup(gridSize) {
  gridContainer.style.cssText = `grid-template-columns: repeat(${gridSize}, 1fr)`;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const smallBox = document.createElement("div");
    smallBox.style.cssText = "border: solid 1px #000";
    smallBox.addEventListener("mouseover", function (e) {
      e.target.style.backgroundColor = "grey";
    });
    gridContainer.appendChild(smallBox);
  }
  console.log(gridSize);
  updateGridSize(gridSize);
}

function clearGrid() {
  document.querySelector("#grid-container").innerHTML = "";
  // document
  //   .querySelectorAll("#grid-container > div")
  //   .forEach((box) => (box.style.backgroundColor = "white"));
}

gridSetup(gridSize);
