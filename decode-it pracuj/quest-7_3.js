/* global readline */

// C:\Users\Romuald\Documents\GitHub\romualdk.github.io\decode-it pracuj\jsshell-win64>js ..\quest-7_2.js < ..\quest-7-sample-1.txt

const MAX_TESTS = 10
const MIN_SIZE = 4
const MAX_SIZE = 50
const MIN_COLORS = 3
const MAX_COLORS = 20
const EMPTY = '.'

const DEBUG = false
const DEBUG_2 = false

main()

/*
INPUT PARSING AND RESULT HANDLING
*/
function main () {
  var numberOfTests = readline() * 1

  if (numberOfTests > MAX_TESTS) {
    numberOfTests = MAX_TESTS
  }

  for (var i = 0; i < numberOfTests; i++) {
    var board = parseTestData()

    if (!isValidBoard(board)) {
      if (DEBUG_2) {
        console.log('N' + ' (' + board.width + 'x' + board.height + ')') // reject test
      } else {
        console.log('N') // reject test
      }
    } else {
      if (DEBUG_2) {
        console.log('Y' + ' (' + board.width + 'x' + board.height + ')') // accept test
      } else {
        console.log('Y') // accept test
      }

      if (DEBUG) {
        drawBoard(board)
      }
      var moves = dummyPlay(board)

      for (var m = 0; m < moves.length; m++) {
        var moveString = moves[m][1] + ' ' + moves[m][0]

        if (DEBUG) {
          moveString += ' ' + moves[m][2]
        }

        if (!DEBUG_2) {
          console.log(moveString)
        }
      }
    }
  }
}

function parseTestData () {
  var hwc = readline()
  var [H, W, C] = hwc.split(' ')

  var board = {
    width: W,
    height: H,
    colors: C,
    data: []
  }

  for (var y = 0; y < H; y++) {
    var line = readline()
    board.data.push(line.split(' '))
  }

  return board
}

function isValidBoard (board) {
  return board.width >= MIN_SIZE && board.width <= MAX_SIZE &&
    board.height >= MIN_SIZE && board.height <= MAX_SIZE &&
    board.colors >= MIN_COLORS && board.colors <= MAX_COLORS
}

/*
GAME LOGIC
*/
function onBoard (x, y, board) {
  return x >= 0 && x < board.width && y >= 0 && y < board.height
}

function copyBoard (board) {
  var tmp = {
    width: board.width,
    height: board.height,
    colors: board.color,
    data: []
  }

  for (var i = 0; i < board.height; i++) {
    tmp.data[i] = Array.from(board.data[i])
  }

  return tmp
}

function floodFill4 (color, x, y, board) {
  var sum = 0

  if (onBoard(x, y, board) && board.data[y][x] === color) {
    board.data[y][x] = EMPTY
    sum += 1
    sum += floodFill4(color, x - 1, y, board)
    sum += floodFill4(color, x + 1, y, board)
    sum += floodFill4(color, x, y - 1, board)
    sum += floodFill4(color, x, y + 1, board)
  }

  return sum
}

function getMoves (board) {
  var tmp = copyBoard(board)

  var moves = []

  for (var y = 0; y < board.height; y++) {
    for (var x = 0; x < board.height; x++) {
      if (tmp.data[y][x] !== EMPTY) {
        var points = floodFill4(tmp.data[y][x], x, y, tmp)

        if (points >= 2) {
          moves.push([x, y, points])
        }
      }
    }
  }

  return moves
}

function getFirstMove (board) {
  var tmp = copyBoard(board)

  for (var y = 0; y < board.height; y++) {
    for (var x = 0; x < board.height; x++) {
      if (tmp.data[y][x] !== EMPTY) {
        var points = floodFill4(tmp.data[y][x], x, y, tmp)

        if (points >= 2) {
          return [[x, y, points]]
        }
      }
    }
  }

  return []
}

function makeMove (x, y, board) {
  return floodFill4(board.data[y][x], x, y, board)
}

function applyGravity (board) {
  for (var x = 0; x < board.width; x++) {
    var moved = true

    while (moved) {
      moved = false

      for (var y = 0; y < board.height - 1; y++) {
        if (board.data[y + 1][x] === EMPTY && board.data[y][x] !== EMPTY) {
          board.data[y + 1][x] = board.data[y][x]
          board.data[y][x] = EMPTY
          moved = true
        }
      }
    }
  }
}

/*
DEBUG FUNCTIONS
*/

function dummyPlay (board) {
  var moves = []
  var moved = true

  while (moved) {
    moved = false
    var move = dummyPlayerMove(board)
    moves.push(move)

    if (move[0] !== -1) {
      moved = true
    }
  }

  return moves
}

function dummyPlayerMove (board) {
  // var moves = getMoves(board)
  var moves = getFirstMove(board)

  if (moves.length > 0) {
    // moves.sort((a, b) => b[2] - a[2])
    var mm = 0
    var pts = makeMove(moves[mm][0], moves[mm][1], board)
    applyGravity(board)
    return [moves[mm][0], moves[mm][1], pts * (pts - 1)]
  } else {
    return [-1, -1, 0]
  }
}

function drawBoard (board) {
  for (var y = 0; y < board.height; y++) {
    console.log(board.data[y].join(' '))
  }
  console.log()
}
