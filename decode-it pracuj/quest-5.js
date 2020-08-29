/* global readline */

/*
https://decode-it.pracuj.pl/

Quest 5 - ODPORNOŚĆ SIECI SPOŁECZNYCH

Trackerzy z naszej ekipy, Alice i Rob, potrzebują Twojej pomocy. Bardzo zainteresowali się sieciami społecznymi i mają kilka pomysłów jak możemy je wykorzystać przy naszym zleceniu.

– “Al, wierzysz w zalecenia dawane Ci przez kolesi, których nie znasz osobiście?” – spytał Robert
– “Nie.” – odpowiedziała Alicja
– “Ale jak twój ziomek daje Ci tipa, to raczej mu ufasz?” – drążył Rob
– “Dokładnie, wtedy to co innego” – odpowiedziała Alice
– “Właśnie, ja mam tak samo. A gdyby ktoś chciał wpłynąć na całą sieć społeczną?” – zapytał Rob
– “Jeśli w danej sieci istnieje osoba, powiedzmy A, która jest w prywatnej relacji z całą resztą, to wystarczy kontrolować konto tej osoby, żeby móc wpływać na całą sieć.” – kontynuował Robert
– “Czyli odporność sieci na takie ataki zależy od jej struktury?” – zauważyła Alice
– “Totalnie! I dokładnie to musimy rozgryźć.” – potwierdził Rob

Kilka godzin później oboje zgodzili się na następujący model: dla sieci społecznej o n członkach i symetrycznej relacji przyjaźni (tzn. jeśli A jest przyjacielem B to również B jest przyjacielem A. Dodatkowo, każdemu członkowi A przypisujemy dodatnią liczbę całkowitą W(A). Liczbę W(A) interpretujemy jako koszt przejęcia kontroli nad kontem członka A.

Zadanie jakie postawili sobie nasi trackerzy polega na znalezieniu takiego zbioru członków sieci społecznej D, że każdy członek sieci społecznej albo należy do tego zbioru albo przyjaźni się z kimś kto do tego zbioru należy. Dodatkowo Alice i Rob chcieliby znaleźć taki zbiór D, dla którego koszt przejęcia kont należących do tego zbioru jest możliwie najmniejszy.

Pomóż im to ogarnąć, a będziemy o krok bliżej do udziału w ważnym dla nas konkursie! 

DANE WEJŚCIOWE

W pierwszej linii danych wejściowych znajduje się liczba całkowita n będąca liczbą członków sieci społecznej. W kolejnych n liniach znajdują się dane w następującym formacie:

name[i] W(name[i])

To znaczy najpierw nazwa i-tego członka sieci będąca ciągiem co najwyżej 15 znaków.
Następnie liczba całkowita 1 <= W(name[i]) <= 250  będąca kosztem przejęcia konta tego członka.

Kolejna linia danych wejściowych zawiera liczbę całkowitą m będącą liczbą relacji przyjaźni między członkami sieci społecznej. W kolejnych m liniach znajdują się dane w następującym formacie:

nameX nameY

To znaczy nazwy dwóch różnych członków o których wiadomo, że są przyjaciółmi.

DANE WYJŚCIOWE

W pierwszej linii danych wyjściowych wypisz liczbę d będącą liczbą członków w wyznaczonym zbiorze D. Następnie w kolejnych d liniach wypisz nazwy członków zbioru D.

Na koniec, w ostatniej linii danych wejściowych wypisz jedną liczbę będącą sumarycznym kosztem przejęcia wszystkich kont ze zbioru D.

PRZYKŁADY

5
Robert 12
Julia 23
Adam 1
Carol 10
Daniel 4
5
Robert Julia
Robert Carol
Adam Robert
Daniel Adam
Daniel Julia

Wyjście
2
Daniel
Carol
14

*/

/*
var n = 5
var people = [
  ['Robert', 12],
  ['Julia', 23],
  ['Adam', 1],
  ['Carol', 10],
  ['Daniel', 4]
]

var m = 5
var edges = [
  ['Robert', 'Julia'],
  ['Robert', 'Carol'],
  ['Adam', 'Robert'],
  ['Daniel', 'Adam'],
  ['Daniel', 'Julia']
]
*/

var n = readline() * 1
var people = []

for (var i = 0; i < n; i++) {
  var line = readline()
  var p = line.split(' ')
  people.push([p[0], p[1] * 1])
}

var m = readline() * 1
var edges = []

for (var i = 0; i < m; i++) {
  var line = readline()
  edges.push(line.split(' '))
}
/*
console.log(people)
console.log(edges)
*/

var weights = {}

for (var i in people) {
  weights[people[i][0]] = people[i][1]
}

var included = []
var excluded = []

function score (name) {
  var sum = 0
  var p = 0

  for (var i in edges) {
    var a = edges[i][0]
    var b = edges[i][1]

    if (a === name && !excluded.includes(b)) {
      sum += weights[b]
      p += 1
    } else if (b === name && !excluded.includes(a)) {
      sum += weights[a]
      p += 1
    }
  }

  return (sum / weights[name]) * p
}

function getScores () {
  var scores = []

  for (var i in people) {
    var name = people[i][0]
    if (!excluded.includes(name)) {
      scores.push([name, score(name)])
    }
  }

  scores.sort(function (a, b) {
    if (a[1] < b[1]) return 1
    if (a[1] > b[1]) return -1
    return 0
  })

  return scores
}

function pick (scores, i) {
  var name = scores[i][0]

  included.push(name)
  excluded.push(name)

  for (var i in edges) {
    var a = edges[i][0]
    var b = edges[i][1]

    if (a === name && !excluded.includes(b)) {
      excluded.push(b)
    } else if (b === name && !excluded.includes(a)) {
      excluded.push(a)
    }
  }
}

function getResult (start) {
  included = []
  excluded = []

  var s = []
  var n = 1
  while (excluded.length < people.length) {
    s = getScores()
    pick(s, n === 1 ? start : 0)

    n++
  }

  var cost = 0

  for (var i in included) {
    cost += weights[included[i]]
  }

  return [included, cost]
}

function calculate () {
  var scores = []

  var x = m / 2

  for (var i = 0; i < x; i++) {
    scores.push(getResult(i))
  }

  scores.sort(function (a, b) {
    if (a[1] < b[1]) return -1
    if (a[1] > b[1]) return 1
    return 0
  })

  var result = scores[0]
  console.log(result[0].length)
  for (var i in result[0]) {
    console.log(result[0][i])
  }
  console.log(result[1])
}

calculate()
