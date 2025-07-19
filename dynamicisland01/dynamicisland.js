const dynisland = document.getElementById("dynamicIsland");

let isExpanded = false;

dynisland.addEventListener("click", () => {
  isExpanded = !isExpanded;
  if (isExpanded) {
    dynisland.style.width = "98%";
    dynisland.style.height = "8%";
  } else {
    dynisland.style.width = "10%";
    dynisland.style.height = "5%";
  }
});
