/* global readline */

/*
https://decode-it.pracuj.pl/

Quest 1 - ZEPSUTY SOROBAN

Leon, wujek Toma, ma warsztat, w którym przerabia różne klamoty, które wpadną mu w ręce. Z pozoru zwykły stolarz, ale niech Cię to nie zwiedzie – jest tam parę rzeczy, które już od dawna mamy na oku i przydałyby się nam na robocie. Jedyny sposób aby spokojnie się tam rozejrzeć, to zatrudnienie się u Leona, który może byłby i chętny, ale jest dość… oldskulowy. Ma Toma za półgłówka i jako warunek przyjęcia go do pracy wyznaczył Tomowi nauczenie się używania starego, samurajskiego liczydła, którego sam Leon używa do sumowania rachunków. Stare samurajskie liczydło nazywa się Soroban. Serio.

Liczydło “Soroban” pozwala prowadzić obliczenia w systemie dziesiętnym. Kolejne cyfry w systemie dziesiętnym reprezentowane są przez kolejne kolumny liczydła, zaczynając od prawej. Koraliki powyżej belki reprezentują wartość 5. Każdy koralik poniżej belki reprezentuje wartość 1. Konkretną cyfrę reprezentuje się dosuwając koraliki do belki na środku. Przykład: 7 pokazuje się dosuwając koralik powyżej belki (5) oraz dwa koraliki poniżej belki (1+1).

Podczas nauki Tom znalazł uszkodzone liczydło. Co prawda wszystkie koraliki powyżej górnej belki są na miejscu, jednak koraliki które powinny być poniżej belki wypadły, a co gorsza, część z nich się zgubiła. Tom postanowił, że naprawi liczydło tak, żeby miało jak największe możliwości. Czyli postanowił powkładać dolne koraliki do liczydła w taki sposób, żeby możliwe było reprezentowanie tak wielu liczb jak się da.

Oczywiście sam sobie z tym nie poradzi, więc pomóż mu to zrobić, zanim Leon straci cierpliwość!

DANE WEJŚCIOWE

Każdy zestaw danych zawiera dwie dodatnie liczby naturalne r oraz s podane w jednym wierszu i rozdzielone spacją:

1 < r < 8 – liczba kolumn liczydła,
0 < s < 4r – liczba koralików, które Johnny znalazł i chce umieścić poniżej dolnej belki liczydła.

DANE WYJŚCIOWE

Wypisz jedną wartość – największą liczbę poprawnych liczb, jaki można reprezentować na zepsutym Sorobanie po naprawach.

PRZYKŁADY

Wejśce    Wyjście
2 1        8
2 3        24

ROZWIĄZANIE

Działa w JavaScript shell (js)
https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Introduction_to_the_JavaScript_shell

Powyżej belki znajduje się po 1 koraliku w każdej kolumnie.
Koraliki, które mają być umieszczone poniżej belki należy umieścić równiemiernie na każdej kolumnie.

Np. 2 kolumny, 3 kolariki.
Można umieścić te 3 koloraliki w jednej kolumnie.
Ale więcej liczb można uzyskać umieszczając 1 koralik w pierwszej kolumnie i 2 koraliki w drugiej.

Dla każdej kolumny należy policzyć ile ma koralików.
Liczba cyfr do uzyskania w kolumnie to 2 * liczba koralików.
Następnie pomnożyć po kolei ilość koralików w każdej kolumnie.

Np. 2 kolumny, 3 koraliki

O O
---
O O
  O

Pierwsza kolumna ma 2 koraliki, czyli liczba cyfr = 2 * 2 = 4
Druga kolumna ma 3 koraili, czyli liczba cyfr = 2 * 3 = 6

Liczba różnych liczb do uzyskania na sokobanie = 4 * 6 = 24

*/

var line = readline()
var input = line.split(' ')

var columns = input[0]
var beads = input[1]

var rows = Math.floor(beads / columns)
var left = beads % columns

var result = 1

for (var i = 1; i <= columns; i++) {
  result *= (1 + rows + (i <= left ? 1 : 0)) * 2
}

console.log(result)
