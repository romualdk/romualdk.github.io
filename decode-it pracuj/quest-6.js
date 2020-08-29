/* global readline */

/*
https://decode-it.pracuj.pl/

Quest 6 - KAMPUS TECHNOLOGICZNY

Potrzebujemy kontrolować miejsce, w którym ma powstać kampus technologiczny. Ogłosili konkurs i musimy go wygrać, żeby nasz projekt został wdrożony. Ułatwi to dużo rzeczy i musisz nam w tym pomóc.

Zdecydowano, że w fazie wstępnej projekty zostaną poddane ocenie parametrycznej, w której jednym z elementów jest koszt stworzenia i utrzymania Kampusu, a to z kolei zależy od długości ogrodzenia, jakie trzeba będzie wokół niego wybudować. Obiekty, które będą umieszczone w Kampusie mają nieregularne kształty, ponadto konieczne jest zagwarantowanie wolnej przestrzeni parku wokół każdego obiektu, dlatego ustalono, że dobrym przybliżeniem będzie plan, na którym obiekty wraz z wolną przestrzenią wokół będą zaznaczone jako okręgi. Twoim zadaniem jest dla każdego planu oszacowanie najmniejszej możliwej długości ogrodzenia budowanego w taki sposób, aby Kampus stanowił jeden spójny obszar.

DANE WEJŚCIOWE

W pierwszej linii liczba testów t. Dla każdego testu w pierwszej linii liczba okręgów n i w kolejnych liniach dla każdego okręgu trzy liczby całkowite -1000 <= x, y, z <= 1000, współrzędne środka i promień okręgu odpowiednio. Nie należy zakładać, że okręgi się nie przecinają lub, że nie są położone jeden wewnątrz drugiego.

DANE WYJŚCIOWE

Dla każdego testu w oddzielnej linii jedna liczba będąca minimalną długością ogrodzenia wokół kampusu.

SPOSÓB PUNKTACJI

Niech oznacza wzorcową długość ogrodzenia, a  długość obliczoną przez program dla planu o numerze i
Niech oraz , gdzie log oznacza logarytm dziesiętny. Wartości wzorcowe podawane są z dokładnością do  . br Punktacja za ocenę planu o numerze i wynosi . br Ostatecznie liczba punktów za zadanie składające się z t testów jest normalizowana tak, żeby finalna punktacja zawierała się w przedziale od 0 do 100

Aby zadanie zostało uznane za rozwiązane należy zdobyć ponad 20 punktów.

PRZYKŁADY

Wejście
1
2
100 100 100
500 100 100

Wyjście
-

KOMENTARZ

Wzorcowa odpowiedź w tym przypadku, to 1428,3185307180. Dla odpowiedzi 1429,215 punktacja w zaokrągleniu do 10^-2 wynosi 0,35. Ostateczna liczba punktów byłaby wtedy równa 35.

Dodatkowe dane testowe dostępne do pobrania.

ROZWIĄZANIE
Na podstawie okregów zbudować listę punktow, które są na tych okręgach (np. co 1 stopień).
Następnie zsumować odległości miedzy punktami.
A convex hull

*/
var points = []
var cp = 360
var step = 2 * Math.PI / cp

var numberOfTests = readline() * 1

for (var n = 0; n < numberOfTests; n++) {
  points = []

  var lines = readline() * 1
  for (var l = 0; l < lines; l++) {
    var line = readline()
    var circle = line.split(' ')
    addCirclePoints(circle[0] * 1, circle[1] * 1, circle[2] * 1)
  }

  var result = lenght(QuickHull(points))

  console.log(result)
}

function addCirclePoints (ox, oy, r) {
  for (var p = 0; p < cp; p++) {
    var angle = p * step

    points.push({
      x: ox + r * Math.sin(angle),
      y: oy + r * Math.cos(angle)
    })
  }
}

function distance (p1, p2) {
  var a = p1.x - p2.x
  var b = p1.y - p2.y

  return Math.sqrt( a*a + b*b )
}

function lenght (points) {
  var sum = 0

  for (var i = 0; i < points.length - 1; i++) {
    sum += distance(points[i], points[i+1])
  }

  return sum
}


// -----------------
var hull = [];

function QuickHull(points) {
    hull = [];
    //if there are only three points, this is a triangle, which by definition is already a hull
    if(points.length == 3) {
        points.push(points[0]); //close the poly
        return points;
    }
    var baseline = getMinMaxPoints(points);
    addSegments(baseline, points);
    addSegments([baseline[1], baseline[0]], points); //reverse line direction to get points on other side
    //add the last point to make a closed loop
    hull.push(hull[0]);
    return hull;
}

/**
 * Return the min and max points in the set along the X axis
 * Returns [ {x,y}, {x,y} ]
 * @param {Array} points - An array of {x,y} objects
 */
function getMinMaxPoints(points) {
    var i;
    var minPoint;
    var maxPoint;

    minPoint = points[0];
    maxPoint = points[0];

    for(i=1; i<points.length; i++) {
        if(points[i].x < minPoint.x)
            minPoint = points[i];
        if(points[i].x > maxPoint.x)
            maxPoint = points[i];
    }

    return [minPoint, maxPoint];
}

/**
 * Calculates the distance of a point from a line
 * @param {Array} point - Array [x,y]
 * @param {Array} line - Array of two points [ [x1,y1], [x2,y2] ]
 */
function distanceFromLine(point, line) {
    var vY = line[1].y - line[0].y;
    var vX = line[0].x - line[1].x;
    return (vX * (point.y - line[0].y) + vY * (point.x - line[0].x))
}

/**
 * Determines the set of points that lay outside the line (positive), and the most distal point
 * Returns: {points: [ [x1, y1], ... ], max: [x,y] ]
 * @param points
 * @param line
 */
function distalPoints (line, points) {
  var i
  var outer_points = []
  var point
  var distal_point
  var distance=0
  var max_distance=0

  for (i = 0; i < points.length; i++) {
    point = points[i]
    distance = distanceFromLine(point,line)

    if (distance > 0) outer_points.push(point)
    else continue

    if (distance > max_distance) {
      distal_point = point
      max_distance = distance
    }
  }

  return { points: outer_points, max: distal_point }
}

/**
 * Recursively adds hull segments
 * @param line
 * @param points
 */
function addSegments(line, points) {
  var distal = distalPoints(line, points)
  if(!distal.max) return hull.push(line[0])
  addSegments([line[0], distal.max], distal.points)
  addSegments([distal.max, line[1]], distal.points)
}

