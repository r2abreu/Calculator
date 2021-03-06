import { eraseLastChar, isOperator, findNeighbours } from './helpers.js';

let input = document.querySelector('.input');
let output = document.querySelector('.output');
let showResult = true;
let interId = setInterval(setPrompt, 500);

(function() {
	let buttons = document.querySelectorAll('div > div:not(:last-of-type):not(:nth-of-type(20)');
	buttons.forEach((button) => {
		button.addEventListener('click', handleClick);
	});
	setPrompt();
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
	} else if (value === '.') {
		if (!input.textContent.endsWith('.') && !input.textContent.includes('.')) {
			input.textContent += '.';
		}
	} else {
		showOperator(value);
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
			// Si el primer caracter es un cero
			if (input.textContent.charAt(0) === '0') {
				if (input.textContent.includes('.')) {
					input.textContent += value;
				} else {
					input.textContent = value;
				}
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

function showOperator(value) {
	if (showResult) {
		if (input.textContent === '0') {
			output.textContent = `0${value}`;
		} else if (
			input.textContent.endsWith('0') &&
			input.textContent.startsWith('0') &&
			input.textContent.length > 1
		) {
			output.textContent = `0${value}`;
			input.textContent = '0';
		} else {
			output.textContent += `${input.textContent}${value}`;
			input.textContent = '0';
		}
	} else {
		output.textContent = `${input.textContent}${value}`;
	}
	input.textContent = '0';
	showResult = true;
}

function calculate() {
	if (showResult) {
		output.textContent += input.textContent;
		let str = output.textContent;
		let reducedOperation = reduceOperation(str);
		let operands = filterOperands(reducedOperation);
		console.log(operands);
		printResult(finalReduce(str, operands));
	}
	showResult = false;
}

function reduceOperation(str) {
	let resultStr = '';

	if (str.includes('%')) {
		let regex = /([0-9]*%[0-9]*)/g;
		let percentageOperands = findNeighbours(str, '%');
		let percentage = handlePercentage(percentageOperands);
		if (!resultStr) {
			resultStr = str.replace(regex, `${percentage}`);
		} else {
			resultStr = resultStr.replace(regex, `${percentage}`);
		}
	}

	if (str.includes('x')) {
		let regex = /([0-9]*x[0-9]*)/g;
		let multiplicationOperands = findNeighbours(str, 'x');
		let multiplication = handleMultiplication(multiplicationOperands);
		if (!resultStr) {
			resultStr = str.replace(regex, `${multiplication}`);
		} else {
			resultStr = resultStr.replace(regex, `${multiplication}`);
		}
	}

	if (str.includes('÷')) {
		let regex = /[0-9]*÷[0-9]*/g;
		let divisionOperands = findNeighbours(str, '÷');
		let division = handleDivision(divisionOperands);
		if (!resultStr) {
			resultStr = str.replace(regex, `${division}`);
		} else {
			resultStr = resultStr.replace(regex, `${division}`);
		}
	}

	return resultStr ? resultStr : str;
}

function finalReduce(str, operands) {
	if (str.includes('+')) {
		return handleSum(operands);
	} else if (str.includes('-')) {
		return handleSubstraction(operands);
	}

	return operands;
}

function handleSum(operands) {
	return operands.reduce((acc, curr) => acc + curr);
}

function handleSubstraction(operands) {
	return operands.reduce((acc, curr) => acc - curr);
}
function handleMultiplication(operands) {
	return operands.reduce((acc, curr) => acc * curr);
}
function handleDivision(operands) {
	return operands.reduce((acc, curr) => acc / curr);
}

function handlePercentage(operands) {
	return operands[0] / 100 * operands[1];
}

function filterOperands(str) {
	let splittedString = str.split(/((?:^\-?[\d\.]+)|(?:(?<=[-+÷%x])(?:\-?[\d\.]+)))/);
	let filteredString = splittedString.filter((digit) => {
		return !isNaN(parseInt(digit));
	});

	let parsedString = filteredString.map((digit) => parseFloat(digit));
	return parsedString;
}

function handleError(str) {
	input.textContent = str;
	setTimeout(() => {
		input.textContent = '0';
	}, 2000);
}

function printResult(result) {
	if (result === Infinity) {
		handleError('Do not divide by zero!');
	} else {
		input.textContent = result;
	}
}
