let ulist = document.querySelector("#dock");
let elements = document.querySelectorAll("#dock > li");
const baseWidth = 455;
const elementCount = elements.length;
const widthPerElement = baseWidth / elementCount;

function mouse_dock_enter(e) {
	let mouseX = e.clientX;
	let totalScaleIncrease = 0;

	elements.forEach((ele) => {
		let rect = ele.getBoundingClientRect();
		let middle = (rect.left + rect.right) / 2;
		let distance = Math.abs(mouseX - middle);
		let MaxDistance = 200;

		if (distance < MaxDistance) {
			const scale = 0.9 + 0.5 * (1 - distance / MaxDistance);
			const translateY = -15 * (1 - distance / MaxDistance);
			ele.style.transform = `translateY(${translateY}px)`;
			ele.querySelector(".dockelement").style.transform = `scale(${scale})`;
			totalScaleIncrease += scale - 1;
		} else {
			ele.style.transform = "none";
			ele.querySelector(".dockelement").style.transform = "none";
		}
	});

	const newWidth = baseWidth + widthPerElement * totalScaleIncrease;
	ulist.style.width = `${newWidth}px`;
}

ulist.addEventListener("mousemove", mouse_dock_enter);
ulist.addEventListener("mouseleave", () => {
	elements.forEach((ele) => {
		ele.style.transform = "none";
		ele.querySelector(".dockelement").style.transform = "none";
	});
	ulist.style.width = `${baseWidth}px`;
});
