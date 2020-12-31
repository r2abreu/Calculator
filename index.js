import { noConsecutiveOperator, eraseLastChar, isOperator, findNeighbours } from './helpers.js';

let input = document.querySelector('.input');
// let inputState = '';
// let interId = setInterval(setPrompt, 500);
let output = document.querySelector('.output');

(function() {
	let buttons = document.querySelectorAll('div > div:not(:last-of-type):not(:nth-of-type(20)');
	buttons.forEach((button) => {
		button.addEventListener('click', handleClick);
	});
	// setPrompt();
	input.textContent = 0;

	input.addEventListener('change', calculate);
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
	calculate();
}

function operatorHandle(value) {
	let str = input.textContent;
	switch (value) {
		case '.':
			if (!str.endsWith('.') && !str.includes('.')) {
				input.textContent += '.';
			}
			return 'decimal';
		case '+':
			noConsecutiveOperator(str, '+');
			calculate();
			return 'addition';
		case '-':
			noConsecutiveOperator(str, '-');
			calculate();
			return 'substraction';
		case 'x':
			noConsecutiveOperator(str, 'x');
			calculate();
			return 'multiplication';
		case '÷':
			noConsecutiveOperator(str, '÷');
			calculate();
			return 'division';
		case '%':
			noConsecutiveOperator(str, '%');
			calculate();
			return 'percentual';
		case '=':
			console.log('EQUAL OPERATOR');
			calculate();
			return 'equal';
		case '%':
			noConsecutiveOperator(str, '%');
			calculate();
			return 'percentual';
		case '⧏':
			input.textContent = eraseLastChar(input.textContent);
			calculate();
			return 'erase';
		case 'C':
			output.textContent = '';
			input.textContent = '0';
			return 'clear';
		default:
			console.log('Operation Error');
	}
}

// function setPrompt() {
// 	if (input.style.borderRight === '1px solid transparent') {
// 		input.style.borderRight = '1px solid #6784d9';
// 	} else {
// 		input.style.borderRight = '1px solid transparent';
// 	}
// }

// function stopPrompt() {
// 	clearInterval(interId);
// 	input.style.borderRight = '';
// }

function calculate() {
	console.log('trigger');
	let str = input.textContent;
	const operands = str.match(/(^[0-9]*\+[0-9]*)*/g);
	const operators = str.match(/[^0-9]+/g);
	console.log(operands);
	if (operands.length >= 2) {
		switch (operators[0]) {
			case 'x':
				output.textContent = findNeighbours(str, 'x').reduce((acc, curr) => acc * curr);
				break;
			case '÷':
				output.textContent = operands[0] * operands[1] / 100;
				break;
			case '+':
				output.textContent = operands.reduce((acc, curr) => acc + curr);
				break;
			case '-':
				output.textContent = operands[0] - operands[1];
				break;
			case '%':
				output.textContent = operands[0] / operands[1];
				break;
		}
	} else {
		output.textContent = '';
	}
}
