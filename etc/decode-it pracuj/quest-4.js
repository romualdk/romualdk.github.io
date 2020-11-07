/* global readline */

/*
https://decode-it.pracuj.pl/

Quest 4 - SZKIELETOWA SIEĆ ŚWIATŁOWODOWA

Kolejny krok za nami, ale nie przestajemy. Aby robota poszła sprawnie i bez zakłóceń potrzebujemy dobrej sieci, dlatego stawiamy światłowodową sieć szkieletową. Jeśli przesył odbywa się tylko poprzez tę sieć, to opóźnienia komunikacyjne są pomijalne. Dzięki temu sieć rozwija się bardzo dynamicznie. Musisz napisać program, który odpowie czy dane dwa adresy IP łączy sieć czysto światłowodowa. Ma być czyste światło, czaisz? Mamy do połączenia dwa fakty:

- jeden z naszych dostarczy nam numery IP pomiędzy którymi koniecznie trzeba zbudować bezpośrednie połączenie [czyli operacje typu B …]

- trzeba też zbadać które węzły łączą się czysto światłowodowo, choć niekoniecznie bezpośrednio [czyli operacje typu T …]

DANE WEJŚCIOWE

Wejście składa się z wierszy, z których każdy zawiera informację o budowie nowego połączenia lub zapytanie o istnienie połączenia.

Informacja o budowie nowego łącza ma postać:
B  IP1  IP2

gdzie IP1 i IP2 to adresy IP (w formacie czterech liczb z zakresu 1..255 oddzielonych kropkami), pomiędzy którymi powstaje łącze. Na początku działania programu sieć nie zawiera żadnych łączy.

Zapytanie o istnienie połączenia światłowodowego ma natomiast postać:
T  IP1  IP2

Dane wejściowe kończą się wraz z końcem pliku.

DANE WYJŚCIOWE

Na każde zapytanie należy wypisać w osobnym wierszu T lub N w zależności, czy dane dwa adresy IP łączy sieć światłowodowa, czy też nie.

PRZYKŁADY

Wejście
B 100.100.100.1 100.100.100.2
B 100.100.100.1 100.100.100.3
B 100.100.100.10 100.100.100.11
T 100.100.100.1 100.100.100.3
T 100.100.100.10 100.100.100.2
T 100.100.100.10 100.100.100.11
B 100.100.100.11 100.100.100.2
T 100.100.100.10 100.100.100.3
T 100.100.100.100 100.100.100.103

Wyjście
T
N
T
T
N

*/

var Edge = function (v, w, weight = 0) {
  this.v = v
  this.w = w
  this.weight = weight
}

Edge.prototype.either = function () {
  return this.v
}

Edge.prototype.other = function (x) {
  return x === this.v ? this.w : this.v
}

Edge.prototype.from = function () {
  return this.v
}

Edge.prototype.to = function () {
  return this.w
}

var Graph = function () {
  this.adjList = []
  this.nodeInfo = []
  this.edges = {}
}

Graph.prototype.addEdge = function (v, w) {
  if (!this.adjList.hasOwnProperty(v)) {
    this.adjList[v] = []
    this.nodeInfo[v] = {}
  }

  if (!this.adjList.hasOwnProperty(w)) {
    this.adjList[w] = []
    this.nodeInfo[w] = {}
  }

  this.adjList[v].push(w)
  this.adjList[w].push(v)
  var edgeId = v + '_' + w
  if (v > w) {
    edgeId = w + '_' + v
  }
  this.edges[edgeId] = new Edge(v, w, 0)
}

Graph.prototype.adj = function (v) {
  return this.adjList[v]; 
}

Graph.prototype.node = function (v) {
  return this.nodeInfo[v]
}

Graph.prototype.edge = function (v, w) {
  var edgeId = v + '_' + w
  if (v > w) {
    edgeId = w + '_' + v
  }
  if (edgeId in this.edges) {
    return this.edges[edgeId]
  }
  return null
}

function DepthFirstSearch (G, s) {
  this.s = s
  var V = G.V
  this.marked = []
  this.edgeTo = []
  for (var v = 0; v < V; ++v) {
    this.marked.push(false)
    this.edgeTo.push(-1)
  }

  this.dfs(G, s)
}

DepthFirstSearch.prototype.dfs = function (G, v) {
  this.marked[v] = true
  var adjV = G.adj(v)

  if (adjV) {
    for (var i = 0; i < adjV.length; ++i) {
      var w = adjV[i]
      if (!this.marked[w]) {
        this.edgeTo[w] = v
        this.dfs(G, w)
      }
    }
  }
}

DepthFirstSearch.prototype.hasPathTo = function (v) {
  return this.marked[v]
}

var g = new Graph()

function test (from, to) {
  var dfs = new DepthFirstSearch(g, from)
  return dfs.hasPathTo(to)
}

var line

while (line = readline()) {
  var params = line.split(' ')

  if (params[0] === 'B') {
    g.addEdge(params[1], params[2])
  } else if (params[0] === 'T') {
    var result = test(params[1], params[2])
    console.log(result ? 'T' : 'N')
  }
}
