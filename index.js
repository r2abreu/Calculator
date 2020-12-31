import { noConsecutiveOperator, eraseLastChar } from './helpers.js';

let input = document.querySelector('.input');
// let inputState = '';
// let interId = setInterval(setPrompt, 500);
let showResult = true;
let output = document.querySelector('.output');

(function() {
	let buttons = document.querySelectorAll('div > div:not(:last-of-type):not(:nth-of-type(20)');
	buttons.forEach((button) => {
		button.addEventListener('click', handleClick);
	});
	// setPrompt();
	input.textContent = 0;
})();

function handleClick() {
	let buttonValue = parseInt(this.firstChild.textContent);
	// If the button's value is not a number
	if (isNaN(buttonValue)) {
		operatorHandle(this.firstChild.textContent);
		// If the button's value is a number
	} else {
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
		if (value === '+' && showResult) {
			output.textContent += input.textContent;
		} else if (value === '+' && !showResult) {
			output.textContent = input.textContent;
		}
		output.textContent += '+';
		input.textContent = '0';
		showResult = true;
	}
}

function numericalHandle(value) {
	// If the length of the string is longer than 14 characters
	if (input.textContent.length < 14) {
		// If the value is 0 and the string is longer `than 1 digit
		if (value === 0 && input.textContent.length > 1) {
			input.textContent += value.toString();
			// If the value is 0 and the string ends in 0
		} else if (value === 0 && input.textContent.endsWith('0')) {
			input.textContent = value.toString();
		} else {
			if (input.textContent.charAt(0) === '0') {
				input.textContent = value.toString();
			} else {
				input.textContent += value.toString();
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
