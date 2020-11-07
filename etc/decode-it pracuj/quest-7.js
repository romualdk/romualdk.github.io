/* global readline */

/*
https://decode-it.pracuj.pl/

Quest 7 - Ostatnie linijki!

Prawie to mamy, ostatnie zadanie – skupmy się! Pamiętasz, jak w dawnych czasach ludzie mieli takie marne rozrywki jak gierki w kolorowe kulki? Dzięki naszym wszystkim akcjom wypadowym dowiedzieliśmy się, że jakiś totalny freak zabezpieczył sprzęt, na którym nam zależy właśnie w taki sposób. Gierka logiczna, rozumiesz? Musisz dać radę, im zrobisz to lepiej, tym większa szansa na wygraną!

Gra logiczna JawBreaker polega na usuwaniu przylegających kulek o tym samym kolorze z prostokątnej planszy. Kulki mogą być usunięte wyłącznie kiedy stykają się bokami i tworzą grupę przynajmniej dwuelementową. Liczba zdobywanych punktów zależy od rozmiaru usuwanej grupy. Liczba punktów przyznawana za usunięcie grupy N elementowej jest równa N(N-1). Przykładowo usunięcie pary kulek premiowane jest dwoma punktami, natomiast usunięcie 8-elementowej grupy jest warte 56 (8 * 7) punktów.

Na kulki rozmieszczone na planszy działa grawitacja – po usunięciu grupy wszystkie kulki, które były powyżej opadają pionowo w dół wypełniając puste miejsca.

Gra kończy się w momencie, w którym na planszy nie ma już ani jednej grupy, która można usunąć. Twoim zadaniem jest zdobycie jak największej liczby punktów dla podanej planszy Jawbreakera.

Przykładowa plansza wygląda następująco:

Na rysunku zaznaczona jest siedmioelementowa grupa, której usunięcie jest premiowane 42 punktami. Po usunięciu wskazanej grupy plansza wygląda następująco:

Przed przystąpieniem do rozwiązywania warto zagrać w grę w sposób interaktywny. Gra dostępna pod linkiem zawiera dodatkową zasadę, którą należy pominąć rozwiązując zadanie. Mianowicie w interaktywnej grze po usunięciu całej kolumny kulki zostają przyciągnięte do strony prawej. Takiej zasady nie stosujemy w tym zadaniu.

PRZYKŁADY

Wejście
1
4 4 3
0 0 1 1
1 1 2 2
0 1 2 0
0 1 1 2

Wyjście
Y
1 0
1 0
3 2
-1 -1

WYJAŚNIENIA

Początkowy stan planszy:

0 0 1 1
1 1 2 2
0 1 2 0
0 1 1 2

Po usunięciu grupy pięciu jedynek wskazanej przez punkt (1, 0) (pierwszy wiersz, zerowa kolumna):

0 0 1 1                  . . . 1
X x 2 2        ->        0 . 1 2
0 x 2 0                  0 . 2 0
0 x x 2                  0 0 2 2

Następnie rozwiązanie ponownie wskazuje na punkt (1, 0) prowadząc do usunięcia czterech zer:

. . . 1                  . . . 1
X . 1 2        ->        . . 1 2
x . 2 0                  . . 2 0
x x 2 2                  . . 2 2

Kolejny ruch wskazuje na punkt (3,2) który należy do trzyelementowej grupy złożonej z dwójek:

. . . 1                  . . . .
. . 1 2        ->        . . . 1
. . x 0                  . . . 2
. . X x                  . . 1 0

Na planszy nie została już ani jedna grupa, rozwiązanie mimo to wskazuje, że był to ostatni ruch poprzez wypisanie “-1 -1”.

*/
/*
1
4 4 3
0 0 1 1
1 1 2 2
0 1 2 0
0 1 1 2
*/

var H = 50
var W = 50
var C = 20

/*
var testBoard = {
  width: 4,
  height: 4,
  colors: 3,
  data: [
    [0, 0, 1, 1],
    [1, 1, 2, 2],
    [0, 1, 2, 0],
    [0, 1, 1, 2]
  ]
}
*/

const TESTS = 100

console.log(TESTS)
for (var i = 0; i < TESTS; i++) {
  var testBoard = {
    width: 4 + Math.floor(Math.random() * 46),
    height: 4 + Math.floor(Math.random() * 46),
    colors: 3 + Math.floor(Math.random() * 17),
    data: []
  }

  for (var y = 0; y < testBoard.height; y++) {
    testBoard.data[y] = []

    for (var x = 0; x < testBoard.width; x++) {
      testBoard.data[y][x] = Math.floor(Math.random() * testBoard.colors)
    }
  }

  console.log(testBoard.height + ' ' + testBoard.width + ' ' + testBoard.colors)
  draw(testBoard)
}


var EMPTY = '.'

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

function draw (board) {
  for (var y = 0; y < board.height; y++) {
    console.log(board.data[y].join(' '))
  }
  // console.log()
}

function advance (board) {
  var moves = getMoves(board)

  if (moves.length > 0) {
    moves.sort((a, b) => b[2] - a[2])
    var mm = 0
    var pts = makeMove(moves[mm][0], moves[mm][1], board)
    applyGravity(board)
    return [moves[mm][0], moves[mm][1], pts * (pts - 1)]
  } else {
    return []
  }
}

function getVariations (board) {
  var moves = getMoves(board)
  var history = []

  for (var i = 0; i < moves.length; i++) {
    var tmp = copyBoard(board)
    var pts = makeMove(moves[i][0], moves[i][1], tmp)
    applyGravity(tmp)
    var h = getVariations(tmp)

    history.push({
      x: moves[i][0],
      y: moves[i][1],
      points: pts * (pts - 1),
      children: h
    })
  }

  return history
}

/*
var vv = getVariations(testBoard)

var paths = []

function summa (v, path, currentSum) {
  if (v.children.length === 0) {
    paths.push([path + '' + v.x + ' ' + v.y, currentSum + v.points])
  } else {
    for (var i in v.children) {
      summa(v.children[i], path + '' + v.x + ' ' + v.y + ',', v.points)
    }
  }
}

for (var i in vv) {
  summa(vv[0], '', vv[0].points)
}

paths.sort((a, b) => b[1] - a[1])

var result = paths[0][0].split(',')

console.log('Y')
for (var i in result) {
  console.log(result[i])
}
console.log('-1 -1')

var DEBUG = false

if (DEBUG === true) {
  for (var i in paths) {
    console.log(JSON.stringify(paths[i]))
  }
  console.log(result)
  console.log()

  draw(testBoard)

  var points = 0

  for (var i in result) {
    var m = result[i].split(' ')

    var pts = makeMove(m[0] * 1, m[1] * 1, testBoard)
    applyGravity(testBoard)
    points += pts * (pts - 1)

    console.log('MOVE ' + m[0] + ' ' + m[1] + ' (' + (pts * (pts - 1)) + ')')
    console.log()

    draw(testBoard)
  }

  draw(testBoard)

  console.log(points)
}
*/
