ENGINE.Font = {
    image: null,
    size: 8,
    columns: 16,

    setImage: function(image) {
        this.image = image;
        /*this.original = image;
        this.image = cq(this.original).canvas;*/
    },

    resetImage: function() {
        //this.image = cq(this.original).canvas;
    },

    setColor: function(color = "#ffffff") {
        var palette = [color];
        var img = cq(this.image).matchPalette(palette);
        this.image = img.canvas;
    },

    text: function(ctx, x, y, text, size = 8) {
        var dx = x;
        var dy = y;

        for(var i in text) {
            var tile = text.charCodeAt(i);
            var sx = (tile % this.columns) * this.size;
            var sy = Math.floor(tile / this.columns) * this.size;

            ctx.drawImage(this.image, sx, sy, this.size, this.size, dx, dy, this.size, this.size);
            dx += size;
        }
    },

    textW: function(ctx, x, y, text, size = 8) {
        var dx = x;
        var dy = y;

        for(var i in text) {
            var tile = text.charCodeAt(i);
            var sx = (tile % this.columns) * this.size;
            var sy = Math.floor(tile / this.columns) * this.size;

            ctx.drawImage(this.image, sx, sy, this.size, this.size, dx, dy, this.size, this.size);
            dx += this.charWidth(tile, size);
        }
    },

    charWidth: function(char, size) {
        return typeof(ENGINE.Font.dlen[char]) === "undefined" ? size : ENGINE.Font.dlen[char] - 1;
    },

    wordWidth: function(word, size) {
        var width = 0;
        for(var i in word) {
            width += ENGINE.Font.charWidth(word.charCodeAt(i), size);
        }

        return width;
    }

}



ENGINE.Font.dlen = [
    8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
    8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
    5,3,5,7,7,7,7,4,5,5,7,7,4,7,3,7,
    7,5,7,7,7,7,7,7,7,7,3,4,6,7,6,7,
    7,7,7,7,7,7,7,7,7,5,7,7,7,7,7,7,
    7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,
    3,7,7,6,7,7,5,7,7,5,5,7,5,8,7,7,
    7,8,6,7,7,7,7,8,7,6,7,6,3,6,7,8];