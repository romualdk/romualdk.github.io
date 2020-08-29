/* global readline */

/*
https://decode-it.pracuj.pl/

Quest 3 - DZIWNE SUMOWANIE

Dobra, przyszła pora na prawdziwą akcję. Pierwsza przeszkoda – znaleźliśmy przydatny klucz, który ma przestarzałe kodowanie, trzeba je rozszyfrować. Mamy ciąg cyfr, który można podzielić na grupy po cztery cyfry każda. Dla każdej czterocyfrowej grupy stwórz dwie dwucyfrowe liczby. Pierwszą liczbę tworzymy biorąc pierwszą i trzecią cyfrę grupy. Drugą liczbę tworzymy biorąc drugą i czwartą cyfrę grupy. Suma otrzymanych liczb jest kodem ASCII kolejnego znaku tajnego hasła. Twoim zadaniem jest napisanie programu dekodującego hasła z podanych sekwencji cyfr.

Przykładowo sekwencję 24746211151814964359 dzielimy na pięć grup 2474 6211 1518 1496 4359. Następnie dla każdej grupy tworzymy dwie liczby, które będziemy dodawać: 27+44  61+21  11+58  19+46  45+39 otrzymując w ten sposób kody znaków ASCII 71 82 69 65 84. W kodzie ASCII mamy hasło: GREAT.

Odszyfrujesz hasło? Wygląda na sporo roboty, szybciej i pewniej będzie napisać program, który zrobi to za Ciebie.

DANE WEJŚCIOWE

Pierwsza linia danych wejściowych zawiera jedną liczbę t – liczbe przypadków testowych. Dla każdego przypadku testowego, pierwsza linia zawiera jedną dodatnią liczbę całkowitą . Druga linia zawiera ciąg cyfr długości 4n będący zaszyfrowanym hasłem.

DANE WYJŚCIOWE

Dla każdego przypadku testowego w osobnej linii należy wypisać rozszyfrowane hasło.

PRZYKŁADY

Wejście
2
5
24746211151814964359
1
2244

Wyjście
GREAT
0

*/

var numberOfTests = readline()

for (var i = 1; i <= numberOfTests; i++) {
  var n = readline()
  var digits = readline()

  console.log(password(n, digits))
}

function password (n, digits) {
  var arr = digits.toString().split('')
  var str = ''

  for (var i = 0; i < n; i++) {
    var offset = i * 4
    var n1 = (arr[offset] + '' + arr[offset + 2]) * 1
    var n2 = (arr[offset + 1] + '' + arr[offset + 3]) * 1

    str += String.fromCharCode(n1 + n2)
  }

  return str
}
