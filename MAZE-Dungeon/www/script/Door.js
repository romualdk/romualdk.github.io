ENGINE.Door = function(x, y, state, sprite) {
    this.image = document.createElement('canvas');
    this.image.width = sprite.size[0] * ENGINE.Tileset.width;
    this.image.height = sprite.size[1] * ENGINE.Tileset.height;
    this.ctx = this.image.getContext("2d");

    this.x = x + sprite.offset[0];
    this.y = y + sprite.offset[1];
    this.state = state;
    this.sprite = sprite;
    this.framesCount = this.sprite.frames.length;
    this.frame = this.state == "opened" ? (this.framesCount - 1) : 0;

    this.updateImage();
    
    this.anim = false;
    this.animStep = 0;
    this.animSpeed = 5;
}


ENGINE.Door.prototype.step = function(dt) {
    if(this.anim == true && this.state != "opened") {
        this.animStep += dt * this.animSpeed;
        this.frame = Math.floor(this.animStep);
        this.updateImage();

        if(this.animStep >= this.framesCount) {
            this.anim = false;
            this.state = "opened";
        }
    }
    else if(this.anim == true && this.state == "opened") {
        this.animStep -= dt * this.animSpeed;
        this.frame = Math.ceil(this.animStep);
        this.updateImage();

        if(this.animStep <= 0) {
            this.anim = false;
            this.state = "closed";
        }
    }

}

ENGINE.Door.prototype.open = function() {
    this.state = "closed";
    this.animStep = 0;
    this.anim = true;
}

ENGINE.Door.prototype.close = function() {
    this.state = "opened";
    this.animStep = this.framesCount;
    this.anim = true;
}

ENGINE.Door.prototype.updateImage = function() {
    for(var x = 0; x < this.sprite.size[0]; x++)
    for(var y = 0; y < this.sprite.size[1]; y++) {
        var tile = this.sprite.frames[this.frame] + (y * ENGINE.Tileset.tilesInRow + x);
        var tilePos = ENGINE.Tileset.tilePos(tile);

        var dx = x * ENGINE.Tileset.width;
        var dy = y * ENGINE.Tileset.height;

        this.ctx.drawImage(ENGINE.Tileset.image, tilePos[0], tilePos[1], ENGINE.Tileset.width, ENGINE.Tileset.height, dx, dy, ENGINE.Tileset.width, ENGINE.Tileset.height);
    }


}

