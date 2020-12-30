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
	if (isNaN(buttonValue)) {
		operatorHandle(this.firstChild.textContent);
	} else {
		if (buttonValue) {
			numericalHandle(buttonValue);
			calculate();
		}
	}
}

function numericalHandle(value) {
	if (input.textContent.length < 14) {
		if (input.textContent === '0') {
			input.textContent = value.toString();
		} else {
			input.textContent += value.toString();
		}
		// input.textContent = format(inputState);
	} else {
		stopPrompt();
	}
}

function operatorHandle(value) {
	switch (value) {
		case '.':
			input.textContent += '.';
			return 'decimal';
		case '+':
			input.textContent += '+';
			return 'addition';
		case '-':
			input.textContent += '-';
			return 'substracion';
		case 'X':
			input.textContent += 'x';
			return 'multiplication';
		case '÷':
			input.textContent += '÷';
			return 'division';
		case '=':
			input.textContent += '=';
			return 'equal';
		case '⧏':
			input.textContent = eraseLastChar(input.textContent);
			return 'erase';
		case 'C':
			return 'clear';
		case '%':
			return 'percentual';
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

function format(number) {
	let nf = new Intl.NumberFormat();
	return nf.format(number);
}

function calculate() {
	const inputSplitted = input.textContent.split(/d*/);
	const operators = inputSplitted.filter((digit) => isNaN(digit));
	const operands = inputSplitted.map((digit) => parseInt(digit)).filter((digit) => !isNaN(digit));
	console.log(operands, operators);
	if (operators[0] === '+') {
		output.textContent = operands[0] + operands[1];
	}
}

function eraseLastChar(str) {
	if (str.length === 1) {
		str = '0';
	} else {
		str = str.substring(0, str.length - 1);
	}

	return str;
}
