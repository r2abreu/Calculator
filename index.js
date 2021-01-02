import { eraseLastChar } from './helpers.js';

let input = document.querySelector('.input');
let output = document.querySelector('.output');
let showResult = true;
// let interId = setInterval(setPrompt, 500);

(function() {
	let buttons = document.querySelectorAll('div > div:not(:last-of-type):not(:nth-of-type(20)');
	buttons.forEach((button) => {
		button.addEventListener('click', handleClick);
	});
	// setPrompt();
	input.textContent = 0;
})();

function handleClick() {
	let buttonValue = this.firstChild.textContent;
	if (isNaN(buttonValue)) {
		// If the button's value is not a number
		operatorHandle(this.firstChild.textContent);
	} else {
		// If the button's value is a number
		if (buttonValue || buttonValue === 0) {
			numericalHandle(buttonValue);
		}
	}
}

function operatorHandle(value) {
	if (value === '⧏') {
		input.textContent = eraseLastChar(input.textContent);
	} else if (value === 'C') {
		output.textContent = '';
		input.textContent = '0';
	} else if (value === '=') {
		calculate();
	} else {
		determineOperation(value);
	}
}

function numericalHandle(value) {
	if (input.textContent.length < 14) {
		// If the length of the string is shorter than 14 characters
		if (value === 0 && input.textContent.length > 1) {
			// If the value is 0 and the string is longer than 1 digit
			input.textContent += value;
		} else if (value === 0 && input.textContent.endsWith('0')) {
			// If the value is 0 and the string ends in 0
			input.textContent = value;
		} else {
			if (input.textContent.charAt(0) === '0') {
				input.textContent = value;
			} else {
				input.textContent += value;
			}
		}
		// input.textContent = format(inputState);
	} else {
		stopPrompt();
	}
}

function setPrompt() {
	if (input.style.borderRight === '1px solid transparent') {
		input.style.borderRight = '1px solid #6784d9';
	} else {
		input.style.borderRight = '1px solid transparent';
	}
}

function stopPrompt() {
	clearInterval(interId);
	input.style.borderRight = '';
}

function calculate() {
	if (showResult) {
		output.textContent += input.textContent;
		let str = output.textContent;
		const operands = str.split('+').map((digit) => parseInt(digit));
		console.log(operands);
		if (str.includes('+')) {
			input.textContent = operands.reduce((acc, curr) => acc + curr);
		}
	}
	showResult = false;
}

function determineOperation(value) {
	if (value === '+') {
		handleSum(value);
	} else if (value === '-') {
		handleSubstraction();
	} else if (value === 'x') {
		handleMultiplication();
	} else if (value === '÷') {
		handleDivision();
	} else {
		handlePercentual();
	}
	output.textContent += value;
	input.textContent = '0';
	showResult = true;
}

function handleSum() {
	if (showResult) {
		output.textContent += input.textContent;
	} else if (!showResult) {
		output.textContent = input.textContent;
	}
}
