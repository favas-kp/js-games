function getRandomNumberInRange(start, end) {
  const difference = end - start;
  const randomNumber = Math.floor(Math.random() * difference);
  return start + randomNumber;
}

function isNumberValid(number) {
  return number + '' !== 'NaN';
}

function getUserInput(start, end, attemptsLeft) {
  const input = +prompt('\nTake a guess! (Remaining attempts: ' + attemptsLeft + ')');

  if (!isNumberValid(input)) {
    console.log('Invalid input! Please enter a number');
    return getUserInput(start, end, attemptsLeft);
  }
  
  const isNumberInRange = input >= start && input <= end;
  if (!isNumberInRange) {
    console.log('Invalid input! Please enter a number within the range');
    return getUserInput(start, end, attemptsLeft);
  }

  return input;
}

function startGame(rangeStart, rangeEnd, maxAttempts) {
  const numberToGuess = getRandomNumberInRange(rangeStart, rangeEnd);

  console.log("\nWelcome to Guess the Number!");
  console.log('The secret number is between ' + rangeStart + ' and ' + rangeEnd + '. You have 5 attempts to find it.');

  let attemptsLeft = maxAttempts;
  while (attemptsLeft > 0) {
    const userInput = getUserInput(rangeStart, rangeEnd, attemptsLeft);

    if (numberToGuess === userInput) {
      console.log("\nBravo! You've nailed it. The number was " + userInput + "!");
      break;
    }

    if (userInput > numberToGuess) {
      console.log(userInput + ' Too high! Try a lower number.');
    } else {
      console.log(userInput + ' Too low! Try a higher number.');
    }

    attemptsLeft--;
  }

  if (attemptsLeft == 0) {
    console.log("\nOh no! You've used all your attempts. Better luck next time!");
  }

  const shouldContinue = confirm('\nDo you want to play again');
  if (shouldContinue) {
    startGame(rangeStart, rangeEnd, maxAttempts);
  } else {
    console.log('Goodbye');
  }
}

startGame(10, 25, 5);
