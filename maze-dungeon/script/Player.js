ENGINE.Player = function(pos) {
    this.lifes = 3;
    this.maxLifes = 4;
    this.isDead = false;
    this.width = 16;
    this.height = 16;
    this.speed = 5;

    this.tile = ENGINE.Tileset._PLAYER + app.character;
    this.isHurt = false;
    this.animStep = 0;
    
    this.move(pos);
}

ENGINE.Player.prototype.step = function(dt) {

}


ENGINE.Player.prototype.move = function(pos) {
    if(this.isHurt || this.isDead) {
        return false;
    }

    this.x = pos[0];
    this.y = pos[1];
    this.rx = pos[0] * ENGINE.Tileset.width + Math.round(this.width / 2);
    this.ry = pos[1] * ENGINE.Tileset.width + Math.round(this.width / 2);

    return true;
}

ENGINE.Player.prototype.hurt = function(gameover) {
    this.tile = ENGINE.Tileset._PLAYER_HURT + app.character;
    this.isHurt = true;
    this.animStep = 0;

    this.lifes--;
    if(this.lifes == 0) {
        this.isDead = true;
        gameover()
    }
}

ENGINE.Player.prototype.step = function(dt) {
    if(this.isHurt) {
        this.animStep += dt;

        if(this.animStep >= 1) {
            this.tile = ENGINE.Tileset._PLAYER + app.character;
            this.isHurt = false;
        }
    }
    
}