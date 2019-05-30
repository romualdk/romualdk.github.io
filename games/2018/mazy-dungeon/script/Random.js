function Lcg(a, c, m) {
    this.a = a;
    this.c = c;
    this.m = m;
    this.seed = 0;
}

Lcg.prototype._random = function() {
    return this.seed = (this.a * this.seed + this.c) % this.m;
}
Lcg.prototype.random = function() {
    return this._random() / (this.m - 1);
}
Lcg.prototype.reseed = function(seed) {
    this.seed = (isDefined(seed) ? seed : Date.now()) % this.m;
}

function isDefined(variable) {
    return !(typeof variable === "undefined");
}

var lcg0 = null;
var lcg1 = null;

function initRandom() {
    lcg0 = new Lcg(2147483629, 2147483587, Math.pow(2, 31) - 1);
    lcg1 = new Lcg(25214903917, 11, Math.pow(2, 48));
}

initRandom();

function random() { return (lcg0.random() + lcg1.random()) % 1; };
function randomReseed(seed) { lcg0.reseed(seed); lcg1.reseed(lcg0.random()); };

function intRandom(max) {
    return Math.floor(random() * (max + 1)) % (max + 1);
}

function pickRandom(array) {
    return array[intRandom(array.length - 1)];
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}