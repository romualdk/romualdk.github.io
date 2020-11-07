/* global readline */

/*
https://decode-it.pracuj.pl/

Quest 0 - WARM UP

Na dobry początek zajmiemy się czymś, co da Ci dobry pogląd na to z czym trzeba będzie się zmierzyć. Jedna osoba z naszej ekipy pracuje nad miejscem, które będzie dobre jako punkt obserwacyjny do kolejnego zlecenia. Spory ogród na dachu jednego z okolicznych biurowców wydaje się do tego idealny. Tom z naszej grupy zatrudnił się tam jako ogrodnik, aby mieć lepszy dostęp do miejsca i wtopić się w tłum.

Jednym z obowiązków Toma jest odpowiednie dbanie o rośliny. Ma przynieść specjalny nawóz, którym nawilży każdą z nich. Na każdy metr kwadratowy przypada jedna paczka nawozu, a ogród ma C metrów kwadratowych. Tom ma plecak, ale jest słaby i udźwignie tylko K kilogramów, gdzie każda paczka waży W kg. Pomóż mu ogarnąć czy da radę przynieść wszystko jak należy tak, aby go nie wylali i nie spalił miejscówki.

DANE WEJŚCIOWE

W pierwszej linii jedna dodatnia liczba całkowita t≤100 oznaczająca liczba testów (Tom został poproszony o przyniesienie odżywek kilka razy). Następnie t linii, każda zawierająca trzy liczby: c, k, w, gdzie 1≤c,k,w≤100.
br
t [liczba testów]
c k w [liczba metrów, udźwig Toma oraz waga nawozu]
c k w [następny test]
…

DANE WYJŚCIOWE

Wypisz t linii zawierających słowo “yes” jeśli Tom jest w stanie wykonać zadanie lub “no” jeśli nawóz przeciąży go i nie dałby rady go donieść.

PRZYKŁADY

Wejście
3
5 15 3
1 5 4
13 25 2

Wyjście
yes
yes
no

ROZWIĄZANIE

Działa w JavaScript shell (js)
https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Introduction_to_the_JavaScript_shell

Dla każdego wiersza sprawdzić czy:

  c * w <= k

*/

var numberOfTests = readline()

for (var i = 1; i <= numberOfTests; i++) {
  var ckw = readline()
  var [c, k, w] = ckw.split(' ')
  var result = test(c, k, w) ? 'yes' : 'no'

  console.log(result)
}

function test (c, k, w) {
  return c * w <= k
}
