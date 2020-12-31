let input = document.querySelector('.input');

function eraseLastChar(str) {
	if (str.length === 1) {
		str = '0';
	} else {
		str = str.substring(0, str.length - 1);
	}

	return str;
}

<<<<<<< HEAD
function isPreceededByOperator(str) {
	if (isOperator(str.charAt(str.length - 1))) {
=======
function isOperator(char) {
	if (char === '+' || char === '-' || char === '%' || char === 'x' || char === '÷' || char === '.') {
>>>>>>> fd3356a29d56b37a2010eeba33b0b827ba4336de
		return true;
	}

	return false;
}

<<<<<<< HEAD
function isOperator(char) {
	if (char === '+' || char === '-' || char === '%' || char === 'x' || char === '÷' || char === '.') {
=======
function isPreceededByOperator(str) {
	if (isOperator(str.charAt(str.length - 1))) {
>>>>>>> fd3356a29d56b37a2010eeba33b0b827ba4336de
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

<<<<<<< HEAD
export { noConsecutiveOperator, eraseLastChar };
=======
// function format(number) {
// 	let nf = new Intl.NumberFormat();
// 	return nf.format(number);
// }

export { noConsecutiveOperator, isPreceededByOperator, isOperator, eraseLastChar };
>>>>>>> fd3356a29d56b37a2010eeba33b0b827ba4336de
