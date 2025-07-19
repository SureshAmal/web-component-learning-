const navEle = document.querySelectorAll("#TopNavLink > li");
const hoverDisplay = document.getElementById("navBoxHover");
const serviceContents = [
	document.getElementById("ServiveContent1"),
	document.getElementById("ServiveContent2"),
	document.getElementById("ServiveContent3"),
];
const nav = document.getElementById("nav");
let currentIndex = -1;
let prevous = null;

// get element positions
hoverDisplay.style.display = "block";
serviceContents.forEach((ele) => (ele.style.display = "block"));
const serviceSizes = serviceContents.map((ele) => ele.getBoundingClientRect());
console.log(serviceSizes);
serviceContents.forEach((ele) => (ele.style.display = "none"));
hoverDisplay.style.display = "none";

navEle.forEach((item, index) => {
	item.addEventListener("mouseover", () => {
		prevous = currentIndex;
		serviceContents.forEach((content) => {
			content.style.display = "none";
			if (content.parentNode === hoverDisplay) {
				hoverDisplay.removeChild(content);
			}
		});
		hoverDisplay.style.display = "block";
		serviceContents[index].style.display = "block";
		hoverDisplay.appendChild(serviceContents[index]);
		const navPoint = item.getBoundingClientRect();
		const hoverPoint = hoverDisplay.getBoundingClientRect();
		const navCenter = navPoint.left + navPoint.width / 2;
		hoverDisplay.style.left = `${navCenter - hoverPoint.width / 2}px`;
		if (prevous == -1) {
		} else {
			serviceContents[index].style.width = `${serviceSizes[prevous].width}px`;
			serviceContents[index].style.height = `${serviceSizes[prevous].height}px`;
		}
		serviceContents[index].style.width = `${serviceSizes[index].width}px`;
		serviceContents[index].style.height = `${serviceSizes[index].height}px`;
		currentIndex = index;
	});
});

hoverDisplay.addEventListener("mouseleave", () => {
	hideHoverDisplay();
});

nav.addEventListener("mouseleave", () => {
	hideHoverDisplay();
});

function hideHoverDisplay() {
	if (currentIndex !== -1) {
		serviceContents[currentIndex].style.display = "none";
		hoverDisplay.style.display = "none";
		currentIndex = -1; // Reset the active index
		prevous = null;
	}
}
