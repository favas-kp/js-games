const PLAYER = '😁';
const MACHINE = '🤖';
const TOGETHER = '🤝';
const FINISH = '🏁';
const SNAKE = '🐉';
const LADDER = '🪜';
const WON = '🏆🏆🏆';

function getHorizontalLines() {
  let horizontalLine = '\n|';
  for (let index = 0; index < 49; index++) {
    horizontalLine = horizontalLine + '-';
  }

  return horizontalLine + '|\n';
}

function isNextLine(index) {
  return index % 10 === 1;
}

function getBox(index, player, machine) {
  if (isLadderPosition(index)) {
    return '| ' + LADDER + ' ';
  }
  if (isSnakePosition(index)) {
    return '| ' + SNAKE + ' ';
  }
  if (index === machine && index == player) {
    return '| ' + TOGETHER + ' ';
  }
  if (index === machine) {
    return '| ' + MACHINE + ' ';
  }
  if (index === player) {
    return '| ' + PLAYER + ' ';
  }
  if (index === 100) {
    return '| ' + FINISH + ' ';
  }
  if (index < 10) {
    return '| 0' + index + ' ';
  }
  return '| ' + index + ' ';
}

function displayBoard(player, machine) {
  let board = getHorizontalLines();

  for (let index = 100; index > 0; index--) {
    board = board + getBox(index, player, machine);
    if (isNextLine(index)) {
      board = board + '|' + getHorizontalLines();
    }
  }

  console.log(board);
}

function rollDice(isPlayerTurn) {
  if (isPlayerTurn) {
    prompt(PLAYER + ' Your turn ' + ' . Press enter to roll dice');
  } else {
    prompt(MACHINE + ' Machine turn. Press enter to roll dice');
  }
  const number = Math.ceil(Math.random() * 6);
  console.log(isPlayerTurn ? 'You' : 'Machine', 'Got -', number);

  return number;
}

function getPromptMessage(isPlayerTurn) {
  if (isPlayerTurn) {
    return ' ' + PLAYER + ' Your turn. Press enter to roll dice';
  }

  return ' ' + MACHINE + ' Machine turn. Press enter to roll dice';
}

function getNumbertoAdd(number, currentPosition) {
  const isExceeding = number + currentPosition > 100;
  return isExceeding ? 0 : number;
}

function isGameEnd(userPosition, machinePosition) {
  if (userPosition >= 100) {
    console.log('\nYou won ' + WON + '\n');
    return true;
  }

  if (machinePosition >= 100) {
    console.log('\nYou lose ..! Machine won\n');
    return true;
  }

  return false;
}

function isLadderPosition(index) {
  switch (index) {
    case 1:
    case 4:
    case 8:
    case 21:
    case 28:
    case 50:
    case 71:
    case 88:
      return true;
    default:
      return false;
  }
}

function isSnakePosition(index) {
  switch (index) {
    case 32:
    case 36:
    case 62:
    case 88:
    case 95:
    case 97:
      return true;
    default:
      return false;
  }
}

function getLadderEnd(index) {
  switch (index) {
    case 1:
      return 38;
    case 4:
      return 14;
    case 8:
      return 30;
    case 21:
      return 42;
    case 28:
      return 76;
    case 50:
      return 67;
    case 71:
      return 92;
    case 88:
      return 99;
    default:
      return index;
  }
}

function getSnakeEnd(index) {
  switch (index) {
    case 32:
      return 10;
    case 36:
      return 6;
    case 62:
      return 18;
    case 88:
      return 24;
    case 95:
      return 56;
    case 97:
      return 27;
    default:
      return index;
  }
}

function main() {
  console.log('\nYou ' + PLAYER + ' v/s ' + MACHINE + ' Machine');

  let userPosition = 0;
  let machinePosition = 0;

  let isPlayerTurn = Math.random() >= 0.5;

  while (true) {
    displayBoard(userPosition, machinePosition);

    if (isGameEnd(userPosition, machinePosition)) {
      break;
    }

    const roll = rollDice(isPlayerTurn);

    if (isPlayerTurn) {
      userPosition += getNumbertoAdd(roll, userPosition);

      if (isLadderPosition(userPosition)) {
        const ladderEnd = getLadderEnd(userPosition);
        userPosition = ladderEnd;

        console.log('You got', LADDER, 'to', ladderEnd);
      }
      if (isSnakePosition(userPosition)) {
        const snakeEnd = getSnakeEnd(userPosition);
        userPosition = snakeEnd;

        console.log('You got', SNAKE, 'to', snakeEnd);
      }
    } else {
      machinePosition += getNumbertoAdd(roll, machinePosition);

      if (isLadderPosition(machinePosition)) {
        const ladderEnd = getLadderEnd(machinePosition);
        machinePosition = ladderEnd;

        console.log('Machine got', LADDER, 'to', ladderEnd);
      }
      if (isSnakePosition(machinePosition)) {
        const snakeEnd = getSnakeEnd(machinePosition);
        machinePosition = snakeEnd;

        console.log('Machine got', SNAKE, 'to', snakeEnd);
      }
    }

    isPlayerTurn = !isPlayerTurn;
  }
}

main();
