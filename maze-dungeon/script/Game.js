



ENGINE.Game = {
  lastLifePoints: 0,
  prevPoints: 0,
  points: 0,
  maxPoints: 9999,

  player: null,
  maze: null,
  rooms: {}, // list of generated rooms with their current state
  room: null, // current room pointer
  
  mazeX: 0,
  mazeY: 0,

  flash: false,
  flashTime: 0,

  changingRoom: false,
  changingRoomTime: 0,
  changingRoomSpeed: 0.5,

  debug: false,

  particles: [],

  enter: function() {
    
  },

  
  resetGame: function() {
    this.lastLifePoints = 0;
    this.prevPoints = 0;
    this.points = 0;
    this.maxPoints = 9999;

    this.player = null;
    this.maze = null;
    this.rooms = {}; // list of generated rooms with their current state
    this.room = null; // current room pointer

    

    initRandom();
    randomReseed(app.randomSeed);

    this.create();
    app.setState(ENGINE.Menu);
  },

  gameover: function() {
    app.roomNumber = 0;
    app.state.dialog = new ENGINE.Dialog("Ooh! I'm dead.", 1 + app.character, function() {

    app.totalPlays += 1;
    app.totalPoints += Number.isInteger(app.state.points) ? app.state.points : 0;

    localStorage.setItem("totalPoints", app.totalPoints);
    localStorage.setItem("totalPlays", app.totalPlays);

    app.state.resetGame();
    }, 1.25);
  },

  create: function() {
    app.roomNumber++;

    this.mazeX = 0;
    this.mazeY = 0;

    this.flash = false;
    this.flashTime = 0;

    this.changingRoom = false;
    this.changingRoomTime = 0;
    this.changingRoomSpeed = 0.5;

    this.debug = false;

    this.particles = [];

    delete this.mazeFogBuffer;
    delete this.maze;
    delete this.room;
    this.rooms = {};

    this.maze = ENGINE.Maze.generate(3, 3);
    this.maze.width = 3;
    this.maze.height = 3;
    this.mazeImage = ENGINE.Maze.image(this.maze);
    this.player = new ENGINE.Player(0, 0);

    this.initBuffer();

    this.changeRoom(this.maze.entry[0], this.maze.entry[1]+1, 2, true);
    
    if(app.roomNumber == 1) {
      this.dialog = new ENGINE.Dialog("My brave knight! Find the way in this maze of dungeons.", 6, null, 0.5);
    }
    else {
      this.dialog = new ENGINE.Dialog("Another maze. Carry on!", 6, null, 0.25);
    }

  },


  changeRoom: function(x, y, door, isStart = false) {
    this.particles = [];

    var room = ENGINE.Maze.room(this.maze, x, y);
    var oppositeDoor = (door + 2) % 4;
    var id = x + "x" + y;

    if(typeof(this.rooms[id]) == "undefined") {
      this.rooms[id] = new ENGINE.Room(app.settings.room.width, app.settings.room.height, room.doors, oppositeDoor, this.maze, x, y);
    }
    else {
      this.rooms[id].shiftDoorsTo(oppositeDoor);
    }

    this.previousRoom = this.room;
    this.room = this.rooms[id];

    if(this.room.isEntrance && isStart) {
      this.player.move([this.room.centerCoords[0], this.room.centerCoords[1]-1]);
    }
    else {
      this.player.move(this.room.doorEntranceCoords[oppositeDoor]);
    }
    
    

    this.mazeX = x;
    this.mazeY = y;

    if(isStart == false) {
      this.changingRoom = true;
      this.changingRoomTime = this.changingRoomSpeed;
      this.door = door;

      this.renderRoom(this.currentRoomBuffer, this.room, false);
      this.renderRoom(this.previousRoomBuffer, this.previousRoom, false);
    }

    this.renderMap();
    this.renderHUD();
    
  },


  

  step: function(dt) {
    if(this.changingRoom && this.previousRoom instanceof ENGINE.Room) {
      this.changingRoomTime -= dt;

      if(this.changingRoomTime <= 0) {
        this.changingRoom = 0;
        this.changingRoomTime = 0;
      }

      return false;
    }


    // Flash screen
    if(this.flash) {
      this.flashTime += dt;

      if(this.flashTime >= 0.1) {
        this.flash = false;
        this.flashTime = 0;
      }
    }

    
    // Room items
    for(var i in this.room.items) {
      this.room.items[i].step(dt);
    }

    // Particles
    for(var i in this.particles) {
      this.particles[i].step(dt);

      if(this.particles[i].lifetime <= 0) {
        this.particles.splice(i, 1);
      }
    }

    if(this.dialog.step(dt) == true) {
      return true;
    }


    // GAME OVER
    if(this.player.isDead) {
      return false;
    }

    // Doors opening / closing
    for(var i in this.room.doorSprites) {
      this.room.doorSprites[i].step(dt);
    }

    
/*
    if(app.controls.a) {
      this.app.sound.play("Coin");
      this.addPoints(1);

      app.controls.a = false;
    }*/


    // Update player state
    this.player.step(dt);

    if(this.player.isHurt) {
      return true;
    }

    // Update player position
    var pos = [null, null];

    if(app.controls.up || app.controls.swipeUp) {
      pos = [this.player.x, this.player.y - 1];
    }
    else if(app.controls.right || app.controls.swipeRight) {
      pos = [this.player.x + 1, this.player.y];
    }
    else if(app.controls.down || app.controls.swipeDown) {
      pos = [this.player.x, this.player.y + 1];
    }
    else if(app.controls.left || app.controls.swipeLeft) {
      pos = [this.player.x - 1, this.player.y];
    }

    app.controls.reset();


    // ENTRANCE STAIRS
    if(pos[0] != null && pos[1] != null && this.room.tiles[pos[0]][pos[1]] == ENGINE.Tileset._STAIRS_ENTRANCE) {
      this.dialog = new ENGINE.Dialog("There is no way back.", 6, null);
    }
    // EXIT STAIRS
    else if(pos[0] != null && pos[1] != null && this.room.tiles[pos[0]][pos[1]] == ENGINE.Tileset._STAIRS_EXIT) {
      this.create();
    }
    // Player movement
    else if(pos[0] != null && pos[1] != null && (this.room.isWalkableTile(pos[0], pos[1]) || this.room.isSpikes(pos))) {
      if(this.player.move(pos)) {
        this.app.sound.play("Walk");

        // Check if leaving the room
        var v = [[0,-1], [1,0], [0,1], [-1,0]];
        for(var i = 0; i < 4; i++) {
          if(pos[0] == this.room.doorsCoords[i][0] && pos[1] == this.room.doorsCoords[i][1]) {
            // leave by the door "i"
            var dx = this.mazeX + v[i][0];
            var dy = this.mazeY + v[i][1];

            
              this.changeRoom(dx, dy, i);
            
            
          }
        }
      }
      
      // ITEMS
      for(var i in this.room.items) {
        if(this.room.items[i].x == pos[0] && this.room.items[i].y == pos[1]) {
          if(this.room.items[i] instanceof ENGINE.Coin) {
            this.app.sound.play("Coin");
            this.addPoints(10);
            this.room.items.splice(i, 1);
          }
        }
      }

      // SPIKES
      if(this.room.isSpikes(pos)) {
        this.room.tiles[pos[0]][pos[1]] = ENGINE.Tileset._SPIKES;
        this.room.image = this.room.getImage();

        this.app.sound.play("Hurt");
        this.player.hurt(this.gameover);
        this.flash = true;
        this.addPoints(-10);
        this.renderHUD();

        
      }
      else if(this.room.tiles[pos[0]][pos[1]] == ENGINE.Tileset._FLOOR) {
        var tileToShow = this.room.showHints(pos);
        this.room.image = this.room.getImage();

        this.addPoints(tileToShow);
      }


    }
    // SWITCH
    else if(this.room.isDoorSwitch(pos[0], pos[1])) {
      if(this.room.shiftDoorsState()) {
        this.app.sound.play("Door");
      }
      
      
    }

    this.triggerParticleText();

  },



  triggerParticleText: function() {
    var dx = this.player.x * ENGINE.Tileset.width + Math.floor(ENGINE.Tileset.width / 2);
    var dy = this.player.y * ENGINE.Tileset.height;
    var points = this.points - this.prevPoints;

    if(points != 0) {
      if((this.points - this.lastLifePoints) >= 500) {
        var color = "#ff004d";
        this.particles.push(new ENGINE.ParticleText(dx,dy, String.fromCharCode(3), color));

        this.player.lifes += 1;
        this.app.sound.play("LifeUp");
        this.renderHUD();

        this.lastLifePoints = Math.floor(this.points / 500) * 500;
      }
      else {
        var color = points > 0 ? "#00e756" : "#ff004d";
        this.particles.push(new ENGINE.ParticleText(dx,dy, "" + points, color));
      }

      

      
    }

    this.prevPoints = this.points;
  },


  renderHUD: function() {
    var margin = 8;
    var roomWidth = (this.room.width + 2) * ENGINE.Tileset.width;
    var roomHeight = (this.room.height + 3) * ENGINE.Tileset.height;


    this.HudBuffer.ctx.fillStyle = app.bgColor;
    this.HudBuffer.ctx.fillRect(0, 0, roomWidth, ENGINE.Tileset.height + 8);

    ENGINE.Font.setColor("#ff0000");
    ENGINE.Font.text(this.HudBuffer.ctx, margin, margin, String.fromCharCode(3));
    ENGINE.Font.setColor();
    ENGINE.Font.text(this.HudBuffer.ctx, margin + ENGINE.Font.size+4, margin, "" + this.player.lifes);

    ENGINE.Font.setColor();

    var points = "" + this.points;
    var str = "" + points;
    ENGINE.Font.text(this.HudBuffer.ctx, roomWidth - margin - ENGINE.Font.size*str.length, margin, str);
  
    ENGINE.Font.setColor("#29adff");
    ENGINE.Font.text(this.HudBuffer.ctx, roomWidth - margin - ENGINE.Font.size*(str.length+1)-2, margin, String.fromCharCode(228));

    var dx = Math.floor((roomWidth - this.mazeBuffer.width) / 2);
    var dy = ENGINE.Tileset.height - this.mazeBuffer.height;
    this.HudBuffer.ctx.drawImage(this.mazeBuffer, dx,dy);
    this.HudBuffer.ctx.drawImage(this.mazeFogBuffer, dx,dy);


/*

    this.buffer.ctx.fillStyle = app.bgColor;
    this.buffer.ctx.fillRect(0, 0, roomWidth, ENGINE.Tileset.height + 8);

    ENGINE.Font.setColor("#ff0000");
    ENGINE.Font.text(this.buffer.ctx, margin, margin, String.fromCharCode(3));
    ENGINE.Font.setColor();
    ENGINE.Font.text(this.buffer.ctx, margin + ENGINE.Font.size+4, margin, "" + this.player.lifes);

    ENGINE.Font.setColor();

    var points = "" + this.points;
    var str = "" + points;
    ENGINE.Font.text(this.buffer.ctx, roomWidth - margin - ENGINE.Font.size*str.length, margin, str);
  
    ENGINE.Font.setColor("#29adff");
    ENGINE.Font.text(this.buffer.ctx, roomWidth - margin - ENGINE.Font.size*(str.length+1)-2, margin, String.fromCharCode(228));

    var dx = Math.floor((roomWidth - this.mazeBuffer.width) / 2);
    var dy = ENGINE.Tileset.height - this.mazeBuffer.height;
    this.buffer.ctx.drawImage(this.mazeBuffer, dx,dy);
    this.buffer.ctx.drawImage(this.mazeFogBuffer, dx,dy);*/

},



  addPoints: function(points = 1) {
    this.points += points;

    if(this.points > this.maxPoints) {
      this.points = this.maxPoints;
    }

    if(this.points < 0) {
      this.points = 0;
    }

    this.renderHUD();
  },


  renderMap: function() {
    this.mazeBuffer = ENGINE.Maze.image(this.maze, this.mazeX + "x" + this.mazeY);
    this.updateMapFog(this.mazeX, this.mazeY);
  },

  updateMapFog: function(x, y) {
    if(typeof(this.mazeFogBuffer) == "undefined") {
      this.mazeFogBuffer = document.createElement('canvas');
      this.mazeFogBuffer.width = this.mazeBuffer.width;
      this.mazeFogBuffer.height = this.mazeBuffer.height;
      this.mazeFogBuffer.ctx = this.mazeFogBuffer.getContext("2d");

      this.mazeFogBuffer.ctx.fillStyle = app.fogColor;
      this.mazeFogBuffer.ctx.fillRect(0,0, this.mazeFogBuffer.width, this.mazeFogBuffer.height);
    }

    if(x >= 0 && y >= 0) {
      this.mazeFogBuffer.ctx.clearRect(x*4,y*4, 5,5);
    }
  },


  renderRoom: function(layer, room, renderPlayer = true) {
      var offsetY = ENGINE.Tileset.height;

      // ROOM
      layer.ctx.drawImage(room.image, 0,offsetY);

      // DOOR
      for(var i in room.doorSprites) {
        var x = room.doorSprites[i].x * ENGINE.Tileset.width;
        var y = room.doorSprites[i].y * ENGINE.Tileset.width;

        layer.ctx.drawImage(room.doorSprites[i].image, x, offsetY + y);
      }


      // DEBUG
      if(this.app.debug) {
        // SPIKE
        for(var i in room.spikes) {
          var pos = room.spikes[i].split("x");
          var dx = pos[0] * ENGINE.Tileset.width;
          var dy = offsetY + pos[1] * ENGINE.Tileset.height;
          var tilePos = ENGINE.Tileset.tilePos(ENGINE.Tileset._SPIKES);
          var sx = tilePos[0];
          var sy = tilePos[1];

          layer.ctx.drawImage(ENGINE.Tileset.image, sx,sy, ENGINE.Tileset.width, ENGINE.Tileset.height, dx, dy, ENGINE.Tileset.width, ENGINE.Tileset.height);
        }


      }
      // end of DEBUG

      // ITEMS
      for(var i in room.items) {
        var tilePos = ENGINE.Tileset.tilePos(ENGINE.Tileset._COIN[room.items[i].frame]);
        var dx = room.items[i].x * ENGINE.Tileset.width;
        var dy = offsetY + room.items[i].y * ENGINE.Tileset.height;

        layer.ctx.drawImage(ENGINE.Tileset.image, tilePos[0], tilePos[1], ENGINE.Tileset.width, ENGINE.Tileset.height, dx, dy, ENGINE.Tileset.width, ENGINE.Tileset.height);

      }
      

      if(renderPlayer) {
        // PLAYER
        var tilePos = ENGINE.Tileset.tilePos(this.player.tile);

        var dx = this.player.x * ENGINE.Tileset.width;
        var dy = offsetY + this.player.y * ENGINE.Tileset.height;

        layer.ctx.drawImage(ENGINE.Tileset.image, tilePos[0], tilePos[1], ENGINE.Tileset.width, ENGINE.Tileset.height, dx, dy, ENGINE.Tileset.width, ENGINE.Tileset.height);
      }
  },



  renderChangingRoom: function(layer, door) {
    var offsetY = ENGINE.Tileset.height;

    var p = this.changingRoomTime / this.changingRoomSpeed * 100;
    var rw = this.currentRoomBuffer.width;
    var rh = this.currentRoomBuffer.height - ENGINE.Tileset.height;

    if(this.door == 0) {
      var shift = Math.floor(rh * p /100);

      var sx = 0;
      var sy = shift + offsetY + 8;
      var sw = this.currentRoomBuffer.width;
      var sh = rh - shift;

      layer.ctx.drawImage(this.currentRoomBuffer, sx,sy,sw,sh, 0,offsetY + 8,sw,sh);

      var sx = 0;
      var sy = offsetY;
      var sw = this.currentRoomBuffer.width;
      var sh = shift;
      var dx = 0;
      var dy = offsetY + rh - shift;

      layer.ctx.drawImage(this.previousRoomBuffer, sx,sy,sw,sh, dx,dy,sw,sh);


    }
    else if(door == 2) {
      var shift = Math.floor(rh * p /100);

      var sx = 0;
      var sy = offsetY + 8 + rh - shift;
      var sw = this.currentRoomBuffer.width;
      var sh = shift;

      layer.ctx.drawImage(this.previousRoomBuffer, sx,sy,sw,sh, 0,offsetY + 8,sw,sh);

      var sx = 0;
      var sy = offsetY;
      var sw = this.currentRoomBuffer.width;
      var sh = rh - shift;
      var dx = 0;
      var dy = offsetY + shift;

      layer.ctx.drawImage(this.currentRoomBuffer, sx,sy,sw,sh, dx,dy,sw,sh);
    }
    else if(door == 1) {
      var shift = Math.floor(rw * p /100);
      
      var sx = this.currentRoomBuffer.width - shift;
      var sy = 0;
      var sw = shift;
      var sh = this.currentRoomBuffer.height;

      layer.ctx.drawImage(this.previousRoomBuffer, sx,sy,sw,sh, 0,0,sw,sh);

      var sx = 0;
      var sy = 0;
      var sw = this.currentRoomBuffer.width - shift;
      var sh = this.currentRoomBuffer.height;
      var dx = shift;
      var dy = 0;

      layer.ctx.drawImage(this.currentRoomBuffer, sx,sy,sw,sh, dx,dy,sw,sh);
    }
    else if(door == 3) {
      var shift = Math.floor(rw * p /100);
      
      var sx = shift;
      var sy = 0;
      var sw = this.currentRoomBuffer.width - shift;
      var sh = this.currentRoomBuffer.height;

      layer.ctx.drawImage(this.currentRoomBuffer, sx,sy,sw,sh, 0,0,sw,sh);

      var sx = 0;
      var sy = 0;
      var sw = shift;
      var sh = this.currentRoomBuffer.height;
      var dx = this.currentRoomBuffer.width - shift;
      var dy = 0;

      layer.ctx.drawImage(this.previousRoomBuffer, sx,sy,sw,sh, dx,dy,sw,sh);
    }

  },


  render: function() {
    var app = this.app;
    var layer = this.app.layer;

    var drawBuffer = true;

    // CHANGING ROOM
    if(this.changingRoom && this.previousRoom instanceof ENGINE.Room) {
        this.renderChangingRoom(this.buffer, this.door);
    // FLASHING SCREEEN
    } else if(this.flash) {
      layer.clear("#ffffff");
      drawBuffer = false;
    }
    // GAMEPLAY
    else {
      this.renderRoom(this.buffer, this.room);

      // HUD
      this.buffer.ctx.drawImage(this.HudBuffer, 0,0, this.HudBuffer.width, this.HudBuffer.height);


      // Particles
      for(var i in this.particles) {
        if(this.particles[i].wait <= 0) {
          var sx = 0;
          var sy = 0;
          var w = this.particles[i].image.width;
          var h = this.particles[i].image.height;
          var dx = Math.floor(this.particles[i].x);
          var dy = Math.floor(this.particles[i].y);

          this.buffer.ctx.drawImage(this.particles[i].image, sx,sy, w,h, dx,dy, w,h);
        }
      }

    }
    
    if(this.dialog) {
      this.dialog.render(this.buffer);
    }


    if(drawBuffer) {
      layer.clear(app.bgColor);
      layer.save();
      layer.translate(app.center.x, app.center.y);
      layer.align(0.5, 0.5);

      var r = app.renderArea;
      layer.drawImage(this.buffer, r.sx,r.sy, r.sw,r.sh, r.dx,r.dy, r.dw,r.dh);
      layer.restore();
    }
  },

  initBuffer: function() {
    this.buffer = document.createElement('canvas');
    this.buffer.width = (app.settings.room.width + 2) * ENGINE.Tileset.width;
    this.buffer.height = (app.settings.room.height + 3 + 1) * ENGINE.Tileset.height;
    this.buffer.ctx = this.buffer.getContext("2d");

    this.currentRoomBuffer = document.createElement('canvas');
    this.currentRoomBuffer.width = this.buffer.width;
    this.currentRoomBuffer.height = this.buffer.height;
    this.currentRoomBuffer.ctx = this.currentRoomBuffer.getContext("2d");

    this.previousRoomBuffer = document.createElement('canvas');
    this.previousRoomBuffer.width = this.buffer.width;
    this.previousRoomBuffer.height = this.buffer.height;
    this.previousRoomBuffer.ctx = this.previousRoomBuffer.getContext("2d");

    this.HudBuffer = document.createElement('canvas');
    this.HudBuffer.width = this.buffer.width;
    this.HudBuffer.height = ENGINE.Tileset.height + 8;
    this.HudBuffer.ctx = this.HudBuffer.getContext("2d");
  }

};
