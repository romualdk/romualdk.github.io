var app = new PLAYGROUND.Application({

  smoothing: false,
  scale: 1,
  preferedAudioFormat: "mp3",

  settings: {
    room: {
      width: 7,
      height: 7
    }
  },

  debug: false,


  swipeAngles: [
      ["up", 235,305],
      ["right", 325, 360],
      ["right", 0, 35],
      ["down", 55, 125],
      ["left", 145, 215]
    ],

  controls: {
    up: false,
    right: false,
    down: false,
    left: false
  },

  keydown: function(event) {
    if(event.key in this.controls) {
      this.controls[event.key] = true;
    }

    
  },

  keyup: function(event) {
    if(event.key in this.controls) {
      this.controls[event.key] = false;
    }
  },

  pointerdown: function(event) {
    this.p1 = event;
  },

  pointerup: function(event) {
    this.p2 = event;

    var angle = Math.atan2(this.p2.y - this.p1.y, this.p2.x - this.p1.x) * 180 / Math.PI;
    if(angle < 0){
        angle += 360;
    }

    var direction = null;
    var i = 0;
    while(direction == null && i < this.swipeAngles.length) {
      if(angle >= this.swipeAngles[i][1] && angle < this.swipeAngles[i][2]) {
        direction = this.swipeAngles[i][0];
      }
      i++;
    }

    this.controls[direction] = true;
  },

  create: function() {
    this.loadImage("font");

    this.bgColor = "#091431";
    this.loadImage("dungeon");
    this.loadSounds("Walk", "Door", "Hurt", "Coin", "LifeUp");
  },

  resize: function() {
    this.bufferMargin = ENGINE.Tileset.width;
    this.bufferWidth = (app.settings.room.width + 2) * ENGINE.Tileset.width;
    this.bufferHeight = (app.settings.room.height + 3 + 1) * ENGINE.Tileset.height;
/*
    var spaceWidth = Math.floor((this.width - 2*this.bufferMargin) / ENGINE.Tileset.width) * ENGINE.Tileset.width;
    var spaceHeight = Math.floor((this.height - 2*this.bufferMargin) / ENGINE.Tileset.height) * ENGINE.Tileset.height;
    var scaleW = spaceWidth / this.bufferWidth;
    var scaleH = spaceHeight / this.bufferHeight;*/

    var scaleW = Math.floor(this.width / this.bufferWidth);
    var scaleH = Math.floor(this.height / this.bufferHeight);

    var scale = scaleW < scaleH ? scaleW : scaleH;

    this.renderArea = {
      sx: 0,
      sy: 0,
      sw: this.bufferWidth,
      sh: this.bufferHeight,
      dw: Math.floor(this.bufferWidth * scale),
      dh: Math.floor(this.bufferHeight * scale),
      dx: 0,
      dy: 0
    };


  },


  ready: function() {
    // CUSTOM PALETTE MODE
    /*var mode = cq(app.images.dungeon);
    mode.matchPalette(cq.palettes.c64);
    app.images.dungeon = mode.canvas;

    var pos = ENGINE.Tileset.tilePos(10);
    var bg = mode.getPixel(pos[0], pos[1]);
    this.bgColor = cq.rgbToHex(bg[0], bg[1], bg[2]);*/

    

    ENGINE.Font.image = this.images.font;
    ENGINE.Tileset.image = app.images.dungeon;


    

    this.setState(ENGINE.Game);

    

  }

});
