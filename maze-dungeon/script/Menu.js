ENGINE.Menu = {
    buttonTime: 0,

    options: [
        ["start", "PRESS START"]
    ],
    currentOption: 0,

    create: function() {
        app.totalPoints = localStorage.getItem("totalPoints") * 1;
        app.totalPlays = localStorage.getItem("totalPlays") * 1;
        app.character = localStorage.getItem("character") * 1;

        if(app.character >= app.characters.length) {
            app.character = 0;
        }

        this.validCharacter = this.checkCharacter();

        if(!Number.isInteger(app.totalPoints)) {
            app.totalPoints = 0;
        }

        if(!Number.isInteger(app.totalPlays)) {
            app.totalPlays = 0;
        }

        this.initBuffer();

        for(var i in this.options) {
            this.options[i][2] = new ENGINE.ParticleText(0,0, this.options[i][1], "#ffffff", 8);
            this.options[i][2].lifetime = 0;
        }

        //app.music = app.sound.play("8bitDungeonLevel", true);
        //app.sound.fadeIn(app.music);
    },

    enter: function() {
        this.updateState();
    },

    updateState: function() {
        this.validCharacter = this.checkCharacter();
        this.initPortrait();
        this.initBackground();
        this.buttonTime = 0;
    },

    initPortrait: function() {
        var portrait = app.character + 1;
        this.portraitW = 4 * 8;
        this.portraitH = 4 * 8;
        var portraitsInRow = 5;
        var portraitsStart = 38 + portrait;
        this.portraitSx = (portraitsStart % portraitsInRow) * this.portraitW;
        this.portraitSy = Math.floor(portraitsStart / portraitsInRow) * this.portraitH;
    },

    step: function(dt) {
        this.buttonTime += dt * 2;
        if(this.buttonTime >= 3) {
            this.buttonTime = this.buttonTime % 3;
        }

        if(app.controls.a && this.validCharacter.isAvailable && this.options[this.currentOption][0] == "start") {
            this.app.sound.play("MenuSelect");
            app.setState(ENGINE.Game);
        }


        if((app.controls.right || app.controls.swipeLeft) && app.character < app.characters.length-1) {
            app.character++;
            this.app.sound.play("MenuMove");
            this.updateState();
        }
        else if((app.controls.left || app.controls.swipeRight) && app.character > 0) {
            app.character--;
            this.app.sound.play("MenuMove");
            this.updateState();
            
        }

        app.controls.reset();
    },


    checkCharacter: function() {
        var valid = {
            plays: app.totalPlays >= app.characters[app.character].plays,
            points: app.totalPoints >= app.characters[app.character].points
        };

        valid.isAvailable = valid.plays & valid.points ? true : false;

        return valid;
    },

    initBackground: function() {
        this.background = document.createElement('canvas');
        this.background.width = this.buffer.width;
        this.background.height = this.buffer.height;
        this.background.ctx = this.background.getContext("2d");

        this.background.ctx.fillStyle = app.bgColor;
        this.background.ctx.fillRect(0,0, this.buffer.width, this.buffer.height);

        // logo
        var dx = Math.floor((this.buffer.width - app.images.title.width) / 2);
        var dy = 8;
        this.background.ctx.drawImage(app.images.title, dx, dy);

        // portrait
        var dx = Math.floor((this.buffer.width - this.portraitW) / 2);
        var dy = 8 + Math.floor((this.buffer.height - this.portraitH) / 2);
        this.background.ctx.drawImage(ENGINE.Tileset.image, this.portraitSx,this.portraitSy, this.portraitW,this.portraitH, dx,dy, this.portraitW,this.portraitH);

        // total plays
        var str = "" + app.totalPlays;

        

        ENGINE.Font.setColor("#29adff");
        ENGINE.Font.text(this.background.ctx, 5, this.buffer.height - 24, String.fromCharCode(4));
        ENGINE.Font.setColor();
        ENGINE.Font.text(this.background.ctx, 5 + 12, this.buffer.height - 24, str);

        if(!this.validCharacter.plays) {
            str = "/" + app.characters[app.character].plays;
            ENGINE.Font.setColor("#fff024");
            ENGINE.Font.text(this.background.ctx, 5, this.buffer.height - 14, str);
        }


        var str = "" + app.totalPoints;

        ENGINE.Font.setColor("#29adff");
        ENGINE.Font.text(this.background.ctx, this.buffer.width - 5 - ENGINE.Font.size*(str.length+1)-2, this.buffer.height - 24, String.fromCharCode(228));
        ENGINE.Font.setColor();
        ENGINE.Font.text(this.background.ctx, this.buffer.width - 5 - ENGINE.Font.size*str.length, this.buffer.height - 24, str);

        if(!this.validCharacter.points) {
            str = "/" + app.characters[app.character].points;
            ENGINE.Font.setColor("#fff024");
            ENGINE.Font.text(this.background.ctx, this.buffer.width - 5 - ENGINE.Font.size*str.length, this.buffer.height - 14, str);
        }

    },

    render: function() {
        var app = this.app;
        var layer = this.app.layer;

        layer.clear(app.bgColor);
        layer.save();
        layer.translate(app.center.x, app.center.y);
        layer.align(0.5, 0.5);

        this.buffer.ctx.drawImage(this.background, 0, 0);



        // button
        var i = this.currentOption;
        var dx = Math.floor((this.buffer.width - this.options[i][2].image.width) / 2);
        var dy = Math.floor((this.buffer.height - this.options[i][2].image.height) / 2) + 40 + i*24;

        if(this.validCharacter.isAvailable) {
            this.buffer.ctx.globalAlpha = 1 - this.buttonTime / 2;

            this.buffer.ctx.drawImage(this.options[i][2].image, dx,dy);

            this.buffer.ctx.globalAlpha = 1;
        }
        else {
            var text = ["Need more "];
            var length = text[0].length;

            if(!this.validCharacter.plays) {
                text.push(String.fromCharCode(4));
                length += text[text.length-1].length;
            }
            if(!this.validCharacter.plays && !this.validCharacter.points) {
                text.push(" and ");
                length += text[text.length-1].length;
            }
            if(!this.validCharacter.points) {
                text.push(String.fromCharCode(228));
                length += text[text.length-1].length;
            }

            dx = Math.floor((this.buffer.width - 8*length) / 2);

            for(var i in text) {
                if(i % 2 == 0) {
                    ENGINE.Font.setColor("#fff024");
                }
                else {
                    ENGINE.Font.setColor("#29adff");
                }
                ENGINE.Font.text(this.buffer.ctx, dx, dy, text[i]);
                dx += text[i].length * 8;
            }
        }
        

        // next character button
        if(app.character < app.characters.length-1) {
            ENGINE.Font.setColor("#ffffff");
        }
        else {
            ENGINE.Font.setColor("#5f574f");
        }

        var dx = 24 + Math.floor((this.buffer.width - this.portraitW) / 2);
        var dy = 12 + 8 + Math.floor((this.buffer.height - this.portraitH) / 2);
        ENGINE.Font.text(this.buffer.ctx, dx + 16, dy, String.fromCharCode(16));
        
        // previous character button
        if(app.character > 0) {
            ENGINE.Font.setColor("#ffffff");
        }
        else {
            ENGINE.Font.setColor("#5f574f");
        }

        var dx = Math.floor((this.buffer.width - this.portraitW) / 2) - 16;
        var dy = 12 + 8 + Math.floor((this.buffer.height - this.portraitH) / 2);
        ENGINE.Font.text(this.buffer.ctx, dx, dy, String.fromCharCode(17));
        
        

        var r = app.renderArea;
        layer.drawImage(this.buffer, r.sx,r.sy, r.sw,r.sh, r.dx,r.dy, r.dw,r.dh);

        layer.restore();
    },

    initBuffer: function() {
        this.buffer = document.createElement('canvas');
        this.buffer.width = (app.settings.room.width + 2) * ENGINE.Tileset.width;
        this.buffer.height = (app.settings.room.height + 3 + 1) * ENGINE.Tileset.height;
        this.buffer.ctx = this.buffer.getContext("2d");

        
  }
}