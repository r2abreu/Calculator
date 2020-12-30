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
		input.textContent += value.toString();
		// input.textContent = format(inputState);
	} else {
		stopPrompt();
	}
}

function operatorHandle(value) {
	switch (value) {
		case '.':
			return 'decimal';
		case '+':
			input.textContent += '+';
			return 'addition';
		case '-':
			return 'substracion';
		case 'X':
			return 'multiplication';
		case '÷':
			return 'division';
		case '=':
			return 'equal';
		case '⧏':
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
