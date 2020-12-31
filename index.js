<<<<<<< HEAD
import { noConsecutiveOperator, eraseLastChar } from './helpers.js';
=======
import { noConsecutiveOperator, isPreceededByOperator, isOperator, eraseLastChar } from './helpers.js';
>>>>>>> fd3356a29d56b37a2010eeba33b0b827ba4336de

let input = document.querySelector('.input');
// let inputState = '';
let interId = setInterval(setPrompt, 500);
let output = document.querySelector('.output');

(function() {
	let buttons = document.querySelectorAll('div > div:not(:last-of-type):not(:nth-of-type(20)');
	buttons.forEach((button) => {
		button.addEventListener('click', handleClick);
	});
	setPrompt();
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
			calculate();
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
			return 'addition';
		case '-':
			noConsecutiveOperator(str, '-');
			return 'substraction';
		case 'x':
			noConsecutiveOperator(str, 'x');
			return 'multiplication';
		case '÷':
			noConsecutiveOperator(str, '÷');
			return 'division';
		case '%':
			noConsecutiveOperator(str, '%');
			return 'percentual';
		case '=':
			console.log('EQUAL OPERATOR');
			return 'equal';
		case '%':
			noConsecutiveOperator(str, '%');
			return 'percentual';
		case '⧏':
			input.textContent = eraseLastChar(input.textContent);
			return 'erase';
		case 'C':
			input.textContent = '0';
			return 'clear';
		default:
			console.log('Operation Error');
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
	const inputSplitted = input.textContent.split(/d*/);
	const operators = inputSplitted.filter((digit) => isNaN(digit));
	const operands = inputSplitted.map((digit) => parseInt(digit)).filter((digit) => !isNaN(digit));
	if (operators[0] === '+') {
		output.textContent = operands[0] + operands[1];
	}
}
