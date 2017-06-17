ENGINE.Font = {
    image: null,
    size: 8,
    columns: 16,

    setColor: function(color = "#ffffff") {
        var palette = [color];
        var img = cq(this.image).matchPalette(palette);
        this.image = img.canvas;
    },

    text: function(ctx, x, y, text) {
        var dx = x;
        var dy = y;

        for(var i in text) {
            var tile = text.charCodeAt(i);
            var sx = (tile % this.columns) * this.size;
            var sy = Math.floor(tile / this.columns) * this.size;

            ctx.drawImage(this.image, sx, sy, this.size, this.size, dx, dy, this.size, this.size);
            dx += this.size;
        }
    }

}