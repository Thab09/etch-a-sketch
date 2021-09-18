const gridContainer = document.getElementById("grid-container");
gridContainer.style.cssText = "grid-template-columns: repeat(16, 1fr)";

for (let i = 0; i < 16 * 16; i++) {
  const smallBox = document.createElement("div");
  smallBox.style.cssText = "border: solid 1px #000";
  smallBox.addEventListener("mouseover", function (e) {
    e.target.style.backgroundColor = "grey";
  });
  gridContainer.appendChild(smallBox);
}
