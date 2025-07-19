let usr_inp = "";
let isDarkTheme = false;

const buttons = {
	clear: document.getElementById("buttonClear"),
	signChange: document.getElementById("buttonSignchanged"),
	percentage: document.getElementById("buttonPercentage"),
	division: document.getElementById("buttonDevisition"),
	multiply: document.getElementById("buttonMultiplication"),
	subtract: document.getElementById("buttonSubtraction"),
	add: document.getElementById("buttonplus"),
	equal: document.getElementById("buttonEqual"),
	decimal: document.getElementById("buttonDecimal"),
	remove: document.getElementById("buttonremove"),
};

const ques = document.getElementById("question");
const answer_label = document.getElementById("answer_label");
const equal_label = document.getElementById("equal_label");
const theme = document.getElementById("thememode");
const theme_icon = document.getElementById("lightmode_icon");

theme.addEventListener("click", () => {
	isDarkTheme = !isDarkTheme;
	const root = document.documentElement;

	if (isDarkTheme) {
		theme_icon.setAttribute("src", "../icons/darkmode.svg");
		root.style.setProperty("--background", "var(--background-dark)");
		root.style.setProperty("--background-alt", "var(--background-alt-dark)");
		root.style.setProperty("--text-color", "var(--text-dark)");
		root.style.setProperty("--button-bg", "var(--button-bg-dark)");
		root.style.setProperty("--button-hover-bg", "var(--button-hover-bg-dark)");
		root.style.color = "white";
	} else {
		theme_icon.setAttribute("src", "../icons/lightmode.svg");
		root.style.setProperty("--background", "var(--background-light)");
		root.style.setProperty("--background-alt", "var(--background-alt-light)");
		root.style.setProperty("--text-color", "var(--text-light)");
		root.style.setProperty("--button-bg", "var(--button-bg-light)");
		root.style.setProperty("--button-hover-bg", "var(--button-hover-bg-light)");
		root.style.color = "black";
	}
});

const digitButtons = Array.from(
	{ length: 10 },
	(_, i) => document.getElementById(`button${i}`),
);

const updateDisplay = (content) => {
	answer_label.textContent = content;
};

const evaluateExpression = () => {
	try {
		usr_inp = usr_inp
			.replace(buttons.multiply.textContent.trim(), "*")
			.replace(buttons.division.textContent.trim(), "/");
		let result = eval(usr_inp);
		if (result === Infinity || result === -Infinity) {
			updateDisplay("Division by zero!");
		} else {
			updateDisplay(result % 1 !== 0 ? result.toFixed(4) : result.toString());
		}
	} catch (error) {
		updateDisplay("Error: Invalid input");
		console.error("Calculation error:", error);
	}
};

const changeSign = (str) => (str.startsWith("-") ? str.slice(1) : `-${str}`);

const calculatePercentage = (str) => {
	try {
		let value = eval(str);
		return str.includes("/") ? value * 100 : value / 100;
	} catch {
		return "Error";
	}
};

buttons.clear.onclick = () => {
	usr_inp = "";
	ques.textContent = "";
	equal_label.textContent = "";
	updateDisplay(usr_inp);
};

buttons.signChange.onclick = () => {
	usr_inp = changeSign(usr_inp);
	updateDisplay(usr_inp);
};

buttons.percentage.onclick = () => {
	ques.textContent = usr_inp;
	equal_label.textContent = "=";
	usr_inp = calculatePercentage(usr_inp);
	updateDisplay(usr_inp);
};

buttons.division.onclick =
	buttons.multiply.onclick =
	buttons.subtract.onclick =
	buttons.add.onclick =
	(event) => {
		usr_inp += event.target.textContent.trim();
		updateDisplay(usr_inp);
	};

buttons.equal.onclick = () => {
	ques.textContent = usr_inp;
	equal_label.textContent = "=";
	evaluateExpression();
};

buttons.decimal.onclick = () => {
	usr_inp += ".";
	updateDisplay(usr_inp);
};

buttons.remove.onclick = () => {
	usr_inp = usr_inp.slice(0, -1);
	updateDisplay(usr_inp);
};

digitButtons.forEach((button, index) => {
	button.onclick = () => {
		usr_inp += index.toString();
		updateDisplay(usr_inp);
	};
});
