function calculate(num1, num2, operationNumber) {
  switch (operationNumber) {
    case '1':
      return num1 + num2;
    case '2':
      return num1 - num2;
    case '3':
      return num1 * num2;
    case '4':
      return num1 / num2;
    default:
      return NaN;
  }
}

function isEqualtoNaN(input) {
  return input + '' === 'NaN' && input !== 'NaN';
}

function getFirstNumber() {
  const firstNumber = +prompt('\nEnter first number :');
  if (!isEqualtoNaN(firstNumber)) {
    return firstNumber;
  }

  console.log('\nInvalid input..!');
  return getFirstNumber();
}

function getSecondNumber() {
  const secondNumber = +prompt('\nEnter second number :');
  if (!isEqualtoNaN(secondNumber)) {
    return secondNumber;
  }

  console.log('\nInvalid input..!');
  return getFirstNumber();
}

function isOperatorValid(operator) {
  const isAdition = operator === '1';
  const isSubtraction = operator === '2';
  const isMultiplication = operator === '3';
  const isDivision = operator === '4';

  return isAdition || isSubtraction || isMultiplication || isDivision;
}

function getOperator() {
  console.log('\n1. Add\n2. Subtract\n3. Multiply\n4. Divide');
  const operator = prompt('Enter operation :');

  if (isOperatorValid(operator)) {
    return operator;
  }

  console.log('\nInvalid operator ..!');
  return getOperator();
}

function main() {
  while (true) {
    const operation = getOperator();
    const firstNumber = getFirstNumber();
    const secondNumber = getSecondNumber();

    const result = calculate(firstNumber, secondNumber, operation);
    console.log('\nResult is', result);

    const shouldRepeat = confirm('\nDo you want to continue..?');
    if (!shouldRepeat) {
      break;
    }
  }
}

main();
