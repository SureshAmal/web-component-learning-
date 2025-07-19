import { generateColor } from "./gradient.js";
/** @type {SVGElement} */
const svg = document.getElementById("curve_timer");
/** @type {HTMLCanvasElement} */
const paper = document.querySelector("#paper");
const time_label = document.querySelector(".time_sec");
/** @type {CanvasRenderingContext2D} */
const pen = paper.getContext("2d");
const reset_timer = document.querySelector(".timer_reset");
const start_timer = document.querySelector(".timer_start");
const degree = Math.PI / 180;
const radius = paper.clientWidth * 0.8;
paper.height = paper.clientHeight;
paper.width = paper.clientWidth;

const center_points = {
	x: paper.width * 0.5,
	y: paper.height * 0.5,
};

function get_circle_point(radius, angle /* must be in degree*/) {
	const points = {
		x: center_points.x + radius * Math.cos(angle * degree),
		y: center_points.y + radius * Math.sin(angle * degree),
	};
	return points;
}

function draw() {
	pen.strokeStyle = "#a1a1a1";
	pen.lineWidth = 2;
	for (let i = -240; i <= 60; i = i + 5) {
		if (i == -180 || i == -90 || i == 0) {
			var point1 = get_circle_point(radius * 0.3 - 9, i);
		} else {
			var point1 = get_circle_point(radius * 0.3 - 3, i);
		}
		var point2 = get_circle_point(radius * 0.3 + 3, i);
		pen.beginPath();
		pen.moveTo(point1.x, point1.y);
		pen.lineTo(point2.x, point2.y);
		pen.stroke();
	}
}

draw();

function setAttributes(element, attrs) {
	for (const [key, value] of Object.entries(attrs)) {
		element.setAttribute(key, value);
	}
}
function curve_no_animation() {
	for (let i = -240; i < 60; i = i + 5) {
		const point1 = get_circle_point(radius * 0.45 + 15, i);
		const point2 = get_circle_point(radius * 0.45 - 15, i);
		const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		setAttributes(line, {
			x1: point1.x,
			y1: point1.y,
			x2: point2.x,
			y2: point2.y,
			stroke: "#a1a1a1",
			"stroke-width": "5",
			"stroke-linecap": "round",
		});
		svg.appendChild(line);
	}
}

curve_no_animation();
const totalLines = 60;
let colors = generateColor("#de1d1d", "#5411c7", 60);
let prev = 0;
var currentAngle = -240;
function curve_animation(n) {
	for (let i = prev; i < n; i++) {
		currentAngle = -240 + i * (300 / totalLines);
		const point1 = get_circle_point(radius * 0.45 + 20, currentAngle);
		const point2 = get_circle_point(radius * 0.45 - 20, currentAngle);
		const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		setAttributes(line, {
			x1: point1.x,
			y1: point1.y,
			x2: point2.x,
			y2: point2.y,
			stroke: "#" + colors[i],
			"stroke-width": "5",
			"stroke-linecap": "round",
			id: "a1",
		});
		svg.appendChild(line);
		prev++;
	}
}
let timer;
console.log(timer);
let time = 0;
reset_timer.onclick = () => {
	time = 0;
	prev = 0;
	time_label.textContent = "0";
	const elements = document.querySelectorAll("#a1");
	elements.forEach((element) => element.remove());
};

start_timer.addEventListener("click", () => {
	if (timer) {
		clearInterval(timer);
		timer = null;
		start_timer.textContent = "start";
	} else {
		timer = setInterval(() => {
			time++;
			curve_animation(time * 2);
			if (time == 31) {
				time = 0;
				prev = 0;
				const elements = document.querySelectorAll("#a1");
				elements.forEach((element) => element.remove());
			}
			time_label.textContent = time;
		}, 1000);
		start_timer.textContent = "pause";
	}
});
