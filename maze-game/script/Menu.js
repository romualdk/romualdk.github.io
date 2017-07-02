ENGINE.Menu = {
    buttonTime: 0,

    options: [
        ["start", "PRESS START"],
        /*["scores", "HIGH SCORES"],*/
        ["credits", "CREDITS"]
    ],
    currentOption: 0,

    create: function() {
        app.totalPoints = localStorage.getItem("totalPoints") * 1;
        app.totalPlays = localStorage.getItem("totalPlays") * 1;

        if(!Number.isInteger(app.totalPoints)) {
            app.totalPoints = 0;
        }

        if(!Number.isInteger(app.totalPlays)) {
            app.totalPlays = 0;
        }

        this.initBuffer();
        this.initSelector();

        for(var i in this.options) {
            this.options[i][2] = new ENGINE.ParticleText(0,0, this.options[i][1]);
            this.options[i][2].lifetime = 0;
        }


        

        //app.music = app.sound.play("8bitDungeonLevel", true);
        //app.sound.fadeIn(app.music);
    },

    enter: function() {
        this.info = new ENGINE.ParticleText(0,0, app.totalPlays + " " + app.totalPoints, "#fff024");
    },

    step: function(dt) {
        this.buttonTime += dt * 2;
        if(this.buttonTime >= 3) {
            this.buttonTime = this.buttonTime % 3;
        }

        if(app.controls.a && this.options[this.currentOption][0] == "start") {
            this.app.sound.play("MenuSelect");
            app.setState(ENGINE.Game);
        }

        if(app.controls.up && this.currentOption > 0) {
            this.app.sound.play("MenuMove");
            this.currentOption--;
            app.controls.up = false;
        }
        else if(app.controls.down && this.currentOption < this.options.length -1) {
            this.app.sound.play("MenuMove");
            this.currentOption++;
            app.controls.down = false;
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


        var dx = Math.floor((this.buffer.width - this.info.image.width) / 2);
        var dy = Math.floor((this.buffer.height - this.info.image.height) / 2) - 16;
        this.buffer.ctx.drawImage(this.info.image, dx,dy);

        var dx = Math.floor((this.buffer.width - this.selectorBuffer.width) / 2);
        var dy = Math.floor((this.buffer.height - this.selectorBuffer.height) / 2) + 8 +  this.currentOption*24;
        this.buffer.ctx.drawImage(this.selectorBuffer, dx,dy);

        
        for(var i in this.options) {
            if(i == this.currentOption) {
                this.buffer.ctx.globalAlpha = 1 - this.buttonTime / 2;
            }
            else {
                this.buffer.ctx.globalAlpha = 0.5;
            }
            
            var dx = Math.floor((this.buffer.width - this.options[i][2].image.width) / 2);
            var dy = Math.floor((this.buffer.height - this.options[i][2].image.height) / 2) + 8 + i*24;
            this.buffer.ctx.drawImage(this.options[i][2].image, dx,dy);
            this.buffer.ctx.globalAlpha = 1;
        }


        
        


        var r = app.renderArea;
        layer.drawImage(this.buffer, r.sx,r.sy, r.sw,r.sh, r.dx,r.dy, r.dw,r.dh);

        

        //ENGINE.Font.text(layer.canvas, 0,0, "PRESS START");

        layer.restore();
    },

    initSelector: function() {
        this.selectorBuffer = document.createElement('canvas');
        this.selectorBuffer.width = ENGINE.Font.size * 15;
        this.selectorBuffer.height = ENGINE.Font.size * 3;
        this.selectorBuffer.ctx = this.selectorBuffer.getContext("2d");

        ENGINE.Font.setImage(app.images.fontd);
        var f = 179;

        var topLine = String.fromCharCode(f);
        var middleLine = String.fromCharCode(f+3);
        var bottomLine = String.fromCharCode(f+6);

        for(var i = 0; i < 13; i++) {
            topLine += String.fromCharCode(f+1);
            middleLine += String.fromCharCode(f+3+1);
            bottomLine += String.fromCharCode(f+6+1);
        }

        topLine += String.fromCharCode(f+2);
        middleLine += String.fromCharCode(f+3+2);
        bottomLine += String.fromCharCode(f+6+2);

        ENGINE.Font.resetImage();
        ENGINE.Font.text(this.selectorBuffer.ctx, 0,0, topLine);
        for(var i = 1; i <= 1; i++) {
            ENGINE.Font.text(this.selectorBuffer.ctx, 0,i*8, middleLine);
        }
        ENGINE.Font.text(this.selectorBuffer.ctx, 0,i*8, bottomLine);

        ENGINE.Font.setImage(app.images.font);
    },

    initBuffer: function() {
        this.buffer = document.createElement('canvas');
        this.buffer.width = (app.settings.room.width + 2) * ENGINE.Tileset.width;
        this.buffer.height = (app.settings.room.height + 3 + 1) * ENGINE.Tileset.height;
        this.buffer.ctx = this.buffer.getContext("2d");

        
  }
}