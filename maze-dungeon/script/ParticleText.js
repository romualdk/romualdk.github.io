ENGINE.ParticleText = function(x, y, text, color, textW, bgColor) {
    this.x = x;
    this.y = y;

    this.vector = [0, -2];
    this.t = 0;
    this.wait = 0;
    this.lifetime = 0.7;

    this.image = document.createElement('canvas');
    if(textW == true) {
        this.image.width = ENGINE.Font.wordWidth(text, 8) + 2;
    }
    else {
        this.image.width = ENGINE.Font.size * text.length + 2;
    }
    
    this.image.height = ENGINE.Font.size + 2;
    this.image.ctx = this.image.getContext("2d");

    this.x -= Math.floor(this.image.width / 2);
    this.y -= Math.floor(this.image.width / 2);

    if(typeof(bgColor) === "undefined") {
        this.image.ctx.fillStyle = app.bgColor;
    }
    else {
        this.image.ctx.fillStyle = bgColor;
    }

    
    this.image.ctx.fillRect(1,0, this.image.width-2, this.image.height);
    this.image.ctx.fillRect(0,1, this.image.width, this.image.height-2);

    if(typeof(color) !== "undefined") {
        ENGINE.Font.setColor(color);
    }
    
    if(textW == true) {
        ENGINE.Font.textW(this.image.ctx, 1,1, text);
    }
    else {
        ENGINE.Font.text(this.image.ctx, 1,1, text);
    }
    
}


ENGINE.ParticleText.prototype.step = function(dt) {
    if(this.wait > 0) {
        this.wait -= dt;
    }
    else if(this.lifetime > 0) {
        this.t += dt * 1.5;
        this.x += this.vector[0] * this.t;
        this.y += this.vector[1] * this.t;

        this.lifetime -= dt;
    }
}