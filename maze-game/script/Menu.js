ENGINE.Menu = {
    buttonTime: 0,

    create: function() {
        this.initBuffer();

        this.startButton = new ENGINE.ParticleText(0,0, "PRESS START");
        this.startButton.lifetime = 0;

        //app.music = app.sound.play("8bitDungeonLevel", true);
        //app.sound.fadeIn(app.music);
    },

    step: function(dt) {
        this.buttonTime += dt * 2;
        if(this.buttonTime >= 3) {
            this.buttonTime = this.buttonTime % 3;
        }

        if(app.controls.a) {
            app.setState(ENGINE.Game);
        }
    },

    render: function() {
        var app = this.app;
        var layer = this.app.layer;

        layer.clear(app.bgColor);
        layer.save();
        layer.translate(app.center.x, app.center.y);
        layer.align(0.5, 0.5);

        this.buffer.ctx.fillStyle = app.bgColor;
        this.buffer.ctx.fillRect(0,0, this.buffer.width, this.buffer.height);

        var dx = Math.floor((this.buffer.width - app.images.title_ko.width) / 2);
        var dy = 16;
        this.buffer.ctx.drawImage(app.images.title_ko, dx, dy);

        //if(this.buttonTime % 3 <= 2) {

        this.buffer.ctx.globalAlpha = 1 - this.buttonTime / 2;
            var dx = Math.floor((this.buffer.width - this.startButton.image.width) / 2);
            var dy = Math.floor((this.buffer.height - this.startButton.image.height) / 2) + 16;
            this.buffer.ctx.drawImage(this.startButton.image, dx,dy);
        this.buffer.ctx.globalAlpha = 1;
        //}


        var r = app.renderArea;
        layer.drawImage(this.buffer, r.sx,r.sy, r.sw,r.sh, r.dx,r.dy, r.dw,r.dh);

        

        //ENGINE.Font.text(layer.canvas, 0,0, "PRESS START");

        layer.restore();
    },

    initBuffer: function() {
        this.buffer = document.createElement('canvas');
        this.buffer.width = (app.settings.room.width + 2) * ENGINE.Tileset.width;
        this.buffer.height = (app.settings.room.height + 3 + 1) * ENGINE.Tileset.height;
        this.buffer.ctx = this.buffer.getContext("2d");
  }
}