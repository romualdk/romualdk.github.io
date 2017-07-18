ENGINE.Dialog = function(text, portrait, next, wait, countdown, onInterrupt, basicInactivity) {
    ENGINE.Font.setImage(app.images.fontd);

    this.width = (app.settings.room.width+1)*2;
    this.height = 4;

    if(typeof(basicInactivity) !== "undefined") {
        this.basicInactivity = wait + basicInactivity
    }
    else {
        this.basicInactivity = 0;
    }

    if(countdown > 0) {
        this.countdown = countdown;
        this.countdownTotal = this.countdown;
        this.onInterrupt = onInterrupt;
        this.height += 1;
    }


    if(portrait > 0) {
        this.portrait = portrait;
        this.portraitW = 4 * 8;
        this.portraitH = 4 * 8;
        var portraitsInRow = 5;
        var portraitsStart = 38 + this.portrait;
        this.portraitSx = (portraitsStart % portraitsInRow) * this.portraitW;
        this.portraitSy = Math.floor(portraitsStart / portraitsInRow) * this.portraitH;
        this.textMargin = this.portraitW + 4;
    }
    else {
        this.textMargin = 0;
    }

    this.textCharacters = this.width - 4;

    this.text = ENGINE.Dialog.splitText(text, this.textCharacters, this.height);
    this.bg = this.bgImage();
    this.image = cq(this.bg);
    this.currentChunk = 0;
    this.renderMessage();

    this.flashTime = 0;

    if(wait > 0) {
        this.active = 0;
        this.wait = wait;
    }
    else {
        this.active = 1;
    }
    

    this.next = next;

    ENGINE.Font.setImage(app.images.font);
    app.controls.a = false;
}


ENGINE.Dialog.prototype.step = function(dt) {
    if(this.active == 0 && this.wait <= 0) {
        return false;
    }
    else if(this.wait > 0) {
        this.wait -= dt;

        if(this.wait <= 0) {
            this.active = 1;
            this.wait = 0;
            this.currentChunk = 0;
            ENGINE.Font.setImage(app.images.fontd);
            this.renderMessage();

        }
    }
    else if(this.countdown > 0) {
        this.countdown -= dt;

        if(this.countdown < 0) {
            this.countdown = 0;

            if(this.next) {
                this.next();
            }
        }
    }
    
    if(this.basicInactivity > 0) {
        this.basicInactivity -= dt;
        

        if(this.basicInactivity < 0) {
            this.basicInactivity = 0;
        }
    }
    
    if(app.controls.any() && this.active && this.basicInactivity == 0) {
        this.currentChunk++;
        ENGINE.Font.setImage(app.images.fontd);
        this.renderMessage();

        app.controls.reset();
    }

    if(this.currentChunk >= this.text.length) {
        this.active = 0;
        ENGINE.Font.setImage(app.images.font);

        if(this.onInterrupt) {
            this.onInterrupt();
        }
        else if(this.next) {
            this.next();
        }

        return false;
    }

    if(!this.onInterrupt) {
        this.flashTime += 3*dt;

        if(this.flashTime > 4) {
            this.flashTime = this.flashTime % 4;
        }

        this.renderFlash();
    }
    

    return true;
},


ENGINE.Dialog.prototype.render = function(buffer) {
    if(this.active != 1) {
        return false;
    }

    var sx = 0;
    var sy = 0;
    var w = this.bg.width;
    var h = this.bg.height;
    var dx = Math.floor((buffer.width - w) / 2);

    if(app.state.player.ry <= Math.floor(buffer.height / 2)) {
        var dy = app.state.player.ry + app.state.player.height + 8;
    }
    else {
        var dy = app.state.player.ry - h;
    }

    buffer.ctx.drawImage(this.bg, sx,sy, w,h, dx,dy, w,h);

    if(this.countdown > 0) {
        var x = ENGINE.Font.size + 4;
        var y = this.bg.height - ENGINE.Font.size*2 + 2;
        var baseW = this.bg.width - ENGINE.Font.size*2 - 8;
        var w = Math.floor(this.countdown / this.countdownTotal * baseW);
        var h = 4;

        buffer.ctx.fillStyle = "#FF0000";
        buffer.ctx.fillRect(dx + x, dy + y, w, h);
    }
},

ENGINE.Dialog.prototype.renderFlash = function() {
    ENGINE.Font.setImage(app.images.fontd);
    var char = this.flashTime < 2 ? 188 : 189;
    ENGINE.Font.text(this.image, this.width*8,(this.height + 1)*8, String.fromCharCode(char));
    ENGINE.Font.setImage(app.images.font);
}


ENGINE.Dialog.prototype.renderPortrait = function() {
    this.image.drawImage(ENGINE.Tileset.image, this.portraitSx, this.portraitSy, this.portraitW, this.portraitH, 8, 8,  this.portraitW, this.portraitH);
}

ENGINE.Dialog.prototype.renderMessage = function() {
    this.bg = this.bgImage();
    this.image = cq(this.bg);

    this.renderPortrait();

    for(var i in this.text[this.currentChunk]) {
        //ENGINE.Font.text(this.image, 8 + this.textMargin, (i*1+1)*8, this.text[this.currentChunk][i], 6);
        ENGINE.Font.textW(this.image, 8 + this.textMargin, (i*1+1)*9-2, this.text[this.currentChunk][i], 8);
    }
}

ENGINE.Dialog.prototype.bgImage = function() {
    var img = document.createElement('canvas');
    img.width = (this.width + 2) * 8;
    img.height = (this.height + 2) * 8;
    img.ctx = img.getContext("2d");

    var f = 179;

    var topLine = String.fromCharCode(f);
    var middleLine = String.fromCharCode(f+3);
    var bottomLine = String.fromCharCode(f+6);

    for(var i = 0; i < this.width; i++) {
        topLine += String.fromCharCode(f+1);
        middleLine += String.fromCharCode(f+3+1);
        bottomLine += String.fromCharCode(f+6+1);
    }

    topLine += String.fromCharCode(f+2);
    middleLine += String.fromCharCode(f+3+2);
    bottomLine += String.fromCharCode(f+6+2);

    ENGINE.Font.resetImage();
    ENGINE.Font.text(img.ctx, 0,0, topLine);
    for(var i = 1; i <= this.height; i++) {
        ENGINE.Font.text(img.ctx, 0,i*8, middleLine);
    }
    ENGINE.Font.text(img.ctx, 0,i*8, bottomLine);

    return img;
}


ENGINE.Dialog.splitText = function(text, maxWidth, maxHeight) {
    var textArr = [];
    var words = text.split(" ");

    maxWidth = maxWidth * 8;

    var i = 0;
    var width = 0;
    textArr[0] = "";
    var w = 0;

    var spaceWidth = ENGINE.Font.charWidth(32, 7);

    while(w < words.length) {
        var wordWidth = ENGINE.Font.wordWidth(words[w], 7);
        
        if((width + wordWidth) <= maxWidth) {
            textArr[i] += words[w] + " ";
            
            width += wordWidth + spaceWidth;
            w++;
        }
        else {
            width = 0;
            i++;
            textArr[i] = "";
        }
    }

    newText = [];
    var n = 0;
    var line = 0;
    newText[n] = [];
    var i = 0;

    while(i < textArr.length) {
        if(line < maxHeight) {
            newText[n][line] = textArr[i];
            line++;
            i++;
        }
        else {
            line = 0;
            n++;
            newText[n] = [];
        }
    }

    return newText;
}


ENGINE.Dialog.splitText_OLD = function(text, maxWidth, maxHeight) {
    var textArr = [];
    var words = text.split(" ");

    var i = 0;
    var width = 0;
    textArr[0] = "";
    var w = 0;

    while(w < words.length) {
        if((width + words[w].length) < maxWidth) {
            textArr[i] += words[w] + " ";
            width += words[w].length + 1;
            w++;
        }
        else {
            //textArr[i] = textArr[i].trim();
            width = 0;
            i++;
            textArr[i] = "";
        }
    }

    //textArr[i] = textArr[i].trim();

    newText = [];
    var n = 0;
    var line = 0;
    newText[n] = [];
    var i = 0;

    while(i < textArr.length) {
        if(line < maxHeight) {
            newText[n][line] = textArr[i];
            line++;
            i++;
        }
        else {
            line = 0;
            n++;
            newText[n] = [];
        }
    }

    return newText;
}

