



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

  


  create: function() {

    this.maze = ENGINE.Maze.generate(3, 3);
    this.maze.width = 3;
    this.maze.height = 3;
    this.mazeImage = ENGINE.Maze.image(this.maze);
    this.player = new ENGINE.Player(0, 0);
    this.changeRoom(this.maze.entry[0], this.maze.entry[1]+1, 2, true);

    this.initBuffer();
    this.renderHUD();

  },


  changeRoom: function(x, y, door, isStart = false) {
    var room = ENGINE.Maze.room(this.maze, x, y);
    var oppositeDoor = (door + 2) % 4;
    var id = x + "x" + y;

    if(typeof(this.rooms[id]) == "undefined") {
      this.rooms[id] = new ENGINE.Room(9, 9, room.doors, oppositeDoor, this.maze, x, y);
    }
    else {
      this.rooms[id].shiftDoorsTo(oppositeDoor);
    }

    this.previousRoom = this.room;
    this.room = this.rooms[id];

    this.player.move(this.room.doorEntranceCoords[oppositeDoor]);
    

    this.mazeX = x;
    this.mazeY = y;

    if(isStart == false) {
      this.changingRoom = true;
      this.changingRoomTime = this.changingRoomSpeed;
      this.door = door;

      this.renderRoom(this.currentRoomBuffer, this.room, false);
      this.renderRoom(this.previousRoomBuffer, this.previousRoom, false);
    }
    
  },




  step: function(dt) {


    if(this.changingRoom && this.previousRoom instanceof ENGINE.Room) {
      this.changingRoomTime -= dt;

      if(this.changingRoomTime <= 0) {
        this.changingRoom = 0;
        this.changingRoomTime = 0;
      }

      

      //console.log(this.door);

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


    // GAME OVER
    if(this.player.isDead) {
      return false;
    }

    // Doors opening / closing
    for(var i in this.room.doorSprites) {
      this.room.doorSprites[i].step(dt);
    }

    

    // Update player state
    this.player.step(dt);

    if(this.player.isHurt) {
      return true;
    }

    // Update player position
    var pos = [null, null];

    if(app.controls.up) {
      pos = [this.player.x, this.player.y - 1];
    }
    else if(app.controls.right) {
      pos = [this.player.x + 1, this.player.y];
    }
    else if(app.controls.down) {
      pos = [this.player.x, this.player.y + 1];
    }
    else if(app.controls.left) {
      pos = [this.player.x - 1, this.player.y];
    }

    app.controls.up = false;
    app.controls.right = false;
    app.controls.down = false;
    app.controls.left = false;

    // Player movement
    if(pos[0] != null && pos[1] != null && (this.room.isWalkableTile(pos[0], pos[1]) || this.room.isSpikes(pos))) {
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
        this.player.hurt();
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
      if((this.points - this.lastLifePoints) >= 100) {
        var color = "#ff004d";
        this.particles.push(new ENGINE.ParticleText(dx,dy, String.fromCharCode(3), color));

        this.player.lifes += 1;
        this.app.sound.play("LifeUp");
        this.renderHUD();

        this.lastLifePoints = Math.floor(this.points / 100) * 100;
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

    this.buffer.ctx.fillStyle = app.bgColor;
    this.buffer.ctx.fillRect(0, roomHeight, roomWidth, roomHeight + ENGINE.Tileset.height);

    ENGINE.Font.setColor("#ff0000");
    ENGINE.Font.text(this.buffer.ctx, margin, roomHeight + margin, String.fromCharCode(3));
    ENGINE.Font.setColor();
    ENGINE.Font.text(this.buffer.ctx, margin + ENGINE.Font.size+1, roomHeight + margin, "x");
    ENGINE.Font.text(this.buffer.ctx, margin + ENGINE.Font.size*2+2, roomHeight + margin, "" + this.player.lifes);

    ENGINE.Font.setColor();

    var points = "" + this.points;
    var str = "Score: " + "0000".substring(0, 4 - points.length) + points;
    ENGINE.Font.text(this.buffer.ctx, roomWidth - margin - ENGINE.Font.size*str.length, roomHeight + margin, str);
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




  renderRoom: function(layer, room, renderPlayer = true) {
      // ROOM
      layer.ctx.drawImage(room.image, 0,0);

      // DOOR
      for(var i in room.doorSprites) {
        var x = room.doorSprites[i].x * ENGINE.Tileset.width;
        var y = room.doorSprites[i].y * ENGINE.Tileset.width;

        layer.ctx.drawImage(room.doorSprites[i].image, x, y);
      }


      // DEBUG
      if(this.app.debug) {
        // SPIKE
        for(var i in room.spikes) {
          var pos = room.spikes[i].split("x");
          var dx = pos[0] * ENGINE.Tileset.width;
          var dy = pos[1] * ENGINE.Tileset.height;
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
        var dy = room.items[i].y * ENGINE.Tileset.height;

        layer.ctx.drawImage(ENGINE.Tileset.image, tilePos[0], tilePos[1], ENGINE.Tileset.width, ENGINE.Tileset.height, dx, dy, ENGINE.Tileset.width, ENGINE.Tileset.height);

      }
      

      if(renderPlayer) {
        // PLAYER
        var tilePos = ENGINE.Tileset.tilePos(this.player.tile);

        var dx = this.player.x * ENGINE.Tileset.width;
        var dy = this.player.y * ENGINE.Tileset.height;

        layer.ctx.drawImage(ENGINE.Tileset.image, tilePos[0], tilePos[1], ENGINE.Tileset.width, ENGINE.Tileset.height, dx, dy, ENGINE.Tileset.width, ENGINE.Tileset.height);
      }
  },



  renderChangingRoom: function(layer, door) {
    var p = this.changingRoomTime / this.changingRoomSpeed * 100;
    var rw = this.currentRoomBuffer.width;
    var rh = this.currentRoomBuffer.height - ENGINE.Tileset.height;

    if(this.door == 0) {
      var shift = Math.floor(rh * p /100);

      var sx = 0;
      var sy = shift;
      var sw = this.currentRoomBuffer.width;
      var sh = rh - shift;

      layer.ctx.drawImage(this.currentRoomBuffer, sx,sy,sw,sh, 0,0,sw,sh);

      var sx = 0;
      var sy = 0;
      var sw = this.currentRoomBuffer.width;
      var sh = shift;
      var dx = 0;
      var dy = rh - shift;

      layer.ctx.drawImage(this.previousRoomBuffer, sx,sy,sw,sh, dx,dy,sw,sh);


    }
    else if(door == 2) {
      var shift = Math.floor(rh * p /100);

      var sx = 0;
      var sy = rh - shift;
      var sw = this.currentRoomBuffer.width;
      var sh = shift;

      layer.ctx.drawImage(this.previousRoomBuffer, sx,sy,sw,sh, 0,0,sw,sh);

      var sx = 0;
      var sy = 0;
      var sw = this.currentRoomBuffer.width;
      var sh = rh - shift;
      var dx = 0;
      var dy = shift;

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
    
    if(drawBuffer) {
      layer.clear(app.bgColor);
      layer.save();
      layer.translate(app.center.x, app.center.y);
      layer.align(0.5, 0.5);
      layer.drawImage(this.buffer, 0, 0);
      layer.restore();
    }
  },

  initBuffer: function() {
    this.buffer = document.createElement('canvas');
    this.buffer.width = (this.room.width + 2) * ENGINE.Tileset.width;
    this.buffer.height = (this.room.height + 3 + 1) * ENGINE.Tileset.height;
    this.buffer.ctx = this.buffer.getContext("2d");

    this.currentRoomBuffer = document.createElement('canvas');
    this.currentRoomBuffer.width = this.buffer.width;
    this.currentRoomBuffer.height = this.buffer.height;
    this.currentRoomBuffer.ctx = this.currentRoomBuffer.getContext("2d");

    this.previousRoomBuffer = document.createElement('canvas');
    this.previousRoomBuffer.width = this.buffer.width;
    this.previousRoomBuffer.height = this.buffer.height;
    this.previousRoomBuffer.ctx = this.previousRoomBuffer.getContext("2d");
  }

};
