ENGINE.Coin = function(x, y) {
    //this.type = "Coin";
    this.x = x;
    this.y = y;
    this.frame = Math.floor(app.random() * ENGINE.Tileset._COIN.length);
    this.frameFloat = 0;
    this.speed = 8 + app.random() * 4;
}

ENGINE.Coin.prototype.x = 0;
ENGINE.Coin.prototype.y = 0;

ENGINE.Coin.prototype.step = function(dt) {
    this.frameFloat = (this.frameFloat + dt * this.speed) % ENGINE.Tileset._COIN.length;
    this.frame = Math.floor(this.frameFloat);
}
