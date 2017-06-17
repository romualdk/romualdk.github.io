var app = new PLAYGROUND.Application({

  smoothing: false,
  scale: 3,
  preferedAudioFormat: "mp3",

  debug: false,

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

  create: function() {
    this.loadImage("font");

    this.bgColor = "#091431";
    this.loadImage("dungeon");
    this.loadSounds("Walk", "Door", "Hurt", "Coin", "LifeUp");
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
