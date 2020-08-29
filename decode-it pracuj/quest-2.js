/* global readline */

/*
https://decode-it.pracuj.pl/

Quest 2 - TAJEMNICA LICZBY 6174

Skrzynki z narzędziami znalezione w warsztacie Leona okazały się dopiero połową roboty. Stary cwaniak zabezpieczył się przed nieproszonymi gośćmi w dodatkowy sposób – czterocyfrowym kodem na każdej ze skrzyń. Dzięki znalezionej obok notatce, udało Ci się rozkminić, że chodzi o 6174, ale dlaczego tak to działa?

Z notatki wynika, że mamy pewną czterocyfrową liczbę, na przykład 4223. Z niej możemy zrobić dwie nowe liczby czterocyfrowe, sortując cyfry wyjściowej liczby raz w porządku nierosnącym i raz w porządku niemalejącym – w tym przypadku 4322 oraz 2234. Następnie trzeba te liczby od siebie odjąć. Powtarzając procedurę po jakimś czasie zawsze wychodzi 6174… Wychodzić wychodzi, ale dlaczego? A zresztą.. potwierdź tylko dla kilku liczb, że faktycznie chodzi o 6174. Nie ma zbyt wiele czasu, miejmy nadzieję, że ta własność ujawnia się szybko.

4332 – 2334 = 1998
9981 – 1899 = 8082
8820 – 0288 = 8532
8532 – 2358 = 6174
7641 – 1467 = 6174
…

1112
2111 - 1112 = 999
9990 - 0999 = 8991
9981 - 1899 = 8082
8820 - 0288 = 8532
8532 - 2358 = 6174

DANE WEJŚCIOWE

W pierwszej linii danych wejściowych znajduje się pojedyncza liczba t, która jest liczbą przypadków do rozważenia. Kolejne t linii zawierają pojedyncze liczby naturalne a, gdzie 1000 <= a <= 9999.

DANE WYJŚCIOWE

Dla każdej liczby a wypisz w osobnej linii liczbę kroków przedstawionej procedury, po których osiągnięta zostanie tajemnicza liczba 6174. Jeśli w procedurze nie da się otrzymać tajemniczej liczby 6174, to należy wypisać liczbę -1.

PRZYKŁADY

Wejście
5
6174
4223
2088
8532
1112

Wyjście
0
3
2
1
5

*/

var numberOfTests = readline()
var lookFor = 6174

for (var i = 1; i <= numberOfTests; i++) {
  var number = readline()

  console.log(calc(number * 1))
}

function calc (number) {
  var steps = 0
  var maxSteps = 10

  while (number !== lookFor && steps < maxSteps) {
    var digits = number.toString().split('').sort()
    var sortedAsc = digits.join('') * 1
    var sortedDesc = digits.reverse().join('').padEnd(4, '0') * 1

    number = sortedDesc - sortedAsc

    steps++
  }

  return steps < maxSteps ? steps : -1
}
