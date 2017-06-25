ENGINE.Dialog = function(text, character, next) {
    ENGINE.Font.setImage(app.images.fontd);

    this.width = (app.settings.room.width+1)*2;
    this.height = 4;
    this.text = ENGINE.Dialog.splitText(text, this.width, this.height);
    this.bg = this.bgImage();
    this.image = cq(this.bg);
    this.currentChunk = 0;
    this.renderText();

    this.flashTime = 0;
    this.active = 1;

    ENGINE.Font.setImage(app.images.font);
    app.controls.a = false;
}


ENGINE.Dialog.prototype.step = function(dt) {
    if(app.controls.a) {
        this.currentChunk++;
        app.controls.a = false;
        ENGINE.Font.setImage(app.images.fontd);
        this.renderText();
    }

    if(this.currentChunk >= this.text.length) {
        this.active = 0;
        ENGINE.Font.setImage(app.images.font);
        return false;
    }


    this.flashTime += 3*dt;

    if(this.flashTime > 4) {
        this.flashTime = this.flashTime % 4;
    }

    this.renderFlash();

    return true;
},


ENGINE.Dialog.prototype.render = function(buffer) {
    if(!this.active) {
        return false;
    }

    var sx = 0;
    var sy = 0;
    var w = this.bg.width;
    var h = this.bg.height;
    var dx = Math.floor((buffer.width - w) / 2);
    var dy = Math.floor((buffer.height - h) / 2);

    buffer.ctx.drawImage(this.bg, sx,sy, w,h, dx,dy, w,h);
},

ENGINE.Dialog.prototype.renderFlash = function() {
    ENGINE.Font.setImage(app.images.fontd);
    var char = this.flashTime < 2 ? 188 : 189;
    ENGINE.Font.text(this.image, this.width*8,(this.height + 1)*8, String.fromCharCode(char));
    ENGINE.Font.setImage(app.images.font);
}

ENGINE.Dialog.prototype.renderText = function() {
    this.bg = this.bgImage();
    this.image = cq(this.bg);

    for(var i in this.text[this.currentChunk]) {
        ENGINE.Font.text(this.image, 8, (i*1+1)*8, this.text[this.currentChunk][i]);
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

