let input = document.querySelector('.input');

function eraseLastChar(str) {
	if (str.length === 1) {
		str = '0';
	} else {
		str = str.substring(0, str.length - 1);
	}

	return str;
}

function isPreceededByOperator(str) {
	if (isOperator(str.charAt(str.length - 1))) {
		return true;
	}

	return false;
}

function isOperator(char) {
	if (char === '+' || char === '-' || char === '%' || char === 'x' || char === '÷' || char === '.') {
		return true;
	}

	return false;
}

function noConsecutiveOperator(str, operator) {
	if (isPreceededByOperator(str)) {
		str = eraseLastChar(str);
		str += operator;
		input.textContent = str;
	} else {
		input.textContent += operator;
	}
}

export { noConsecutiveOperator, eraseLastChar };
