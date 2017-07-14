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

  characters: [
    {name: "Knight", plays: 0, points: 0},
    {name: "Cyclop", plays: 10, points: 1000},
    {name: "Orc", plays: 50, points: 5000},
    {name: "Troll", plays: 100, points: 10000},
    {name: "Ogre", plays: 150, points: 15000},
    {name: "King", plays: 200, points: 20000}
  ],


  swipeAngles: [
      ["swipeUp", 235,305],
      ["swipeRight", 325, 360],
      ["swipeRight", 0, 35],
      ["swipeDown", 55, 125],
      ["swipeLeft", 145, 215]
    ],

  controls: {
    up: false,
    right: false,
    down: false,
    left: false,
    swipeUp: false,
    swipeRight: false,
    swipeDown: false,
    swipeLeft: false,
    a: false,

    any: function() {
      return this.up || this.right || this.down || this.left || this.swipeUp || this.swipeRight || this.swipeDown || this.swipeLeft || this.a;
    },
    reset: function() {
      this.up = false;
      this.right = false;
      this.down = false;
      this.left = false;
      this.swipeUp = false;
      this.swipeRight = false;
      this.swipeDown = false;
      this.swipeLeft = false;
      this.a = false;
    }
  },

  keydown: function(event) {
    if(event.key in this.controls) {
      this.controls[event.key] = true;
    }

    if(event.key == "enter") {
      this.controls.a = true;
    }
    
  },

  keyup: function(event) {
    if(event.key in this.controls) {
      this.controls[event.key] = false;
    }

    if(event.key == "enter") {
      this.controls.a = false;
    }
  },

  pointerdown: function(event) {
    this.p1 = event;
  },

  pointerup: function(event) {
    

    this.p2 = event;
    var a = this.p1.x - this.p2.x;
    var b = this.p1.y - this.p2.y;
    var distance = Math.sqrt( a*a + b*b );

    if(distance <= 10) {
      this.controls.a = true;
      return false;
    }

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

  random: function() {
    return random();
  },

  intRandom: function(max) {
    return intRandom(max);
  },

  create: function() {
    this.bgColor = "#091431";
    this.outlineColor = "#29adff";
    this.fogColor = "#5f574f";

    this.loadImage("title");
    this.loadImage("dungeon");
    this.loadImage("font");
    this.loadImage("fontd");
    this.loadSounds("Walk", "Door", "Hurt", "Coin", "LifeUp", "MenuMove", "MenuSelect"/*, "8bitDungeonLevel"*/);

    app.randomSeed = localStorage.getItem("randomSeed") * 1;

    if(app.randomSeed == 0) {
      app.randomSeed = Date.now();
      localStorage.setItem("randomSeed", app.randomSeed)
    }

    randomReseed(app.randomSeed);

    app.roomNumber = 0;
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

    if(scale > 3) {
      scale = 3;
    }
    else if(scale <= 0) {
      scale = 1;
    }


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

    

    //ENGINE.Font.image = this.images.font;
    ENGINE.Font.setImage(this.images.font);
    ENGINE.Tileset.image = app.images.dungeon;


    

    this.setState(ENGINE.Menu);

    //this.setState(ENGINE.Game);

    

  }

});
