ENGINE.Room = function(width, height, doors, entrance, maze, x,y) {
    this.isEntrance = false;
    this.isExit = false;

    if(y > (maze.height - 1)) {
        this.isEntrance = true;
    }
    else if (y < 0) {
        this.isExit = true;
    }

    var d = new Date();
    var t1 = d.getTime();

    doors[entrance] = 2;

    this.width = width;
    this.height = height;
    this.doors = doors;
    this.openedDoor = -1;
    this.centerCoords = [];
    this.doorsCoords = [];
    this.tiles = [];
    this.hints = [];
    this.spikes = [];
    this.floor = [];

    this.items = [];

    this.doorSprites = [];

    this.initCoords();

    this.initTilesArray();
    this.initWalls();
    


    var evaluated = false;
    var iterations = 0;

    // Floor with spikes
    while(evaluated == false) {
        this.initFloor();
        evaluated = this.evaluate();
        iterations++;
    }

    this.initFloorHints();


    // Items
    var coins = [];
    for(var i = 0; i < 8; i++) {
        if(app.random() * 100 < 50) {
            // Put coin
            var emptySpace = false;
            while(!emptySpace) {
                var ox = Math.floor(app.random() * this.width)+1;
                var oy = Math.floor(app.random() * this.height)+2;

                if(this.tiles[ox][oy] == ENGINE.Tileset._FLOOR && coins.indexOf(ox + "x" + oy) == -1
                && (
                    ox != this.doorEntranceCoords[entrance][0]
                    || oy != this.doorEntranceCoords[entrance][1]
                ))
                {
                    if(!this.isEntrance
                    || (this.isEntrance && ox != this.centerCoords[0] && oy != (this.centerCoords[1]-1))) {
                        emptySpace = true;
                        this.items.push(new ENGINE.Coin(ox, oy));
                        coins.push(ox + "x" + oy);
                    }
                }
            }
        }
    }

    if(this.isEntrance) {
        this.showHints([this.centerCoords[0], this.centerCoords[0]-1]);
    }
    else {
        this.showHints(this.doorEntranceCoords[entrance]);
    }

    this.hideSpikes();
    this.initDoors();


    

    
    d = new Date();
    var t2 = d.getTime();

    this.image = this.getImage();
};

ENGINE.Room.prototype.initCoords = function() {
  this.centerCoords = [
    Math.floor((this.width - 1) / 2) + 1,
    Math.floor((this.height - 1) / 2) + 2
  ];

  this.doorsCoords = [
      [this.centerCoords[0], 1],
      [this.width + 1, this.centerCoords[1]],
      [this.centerCoords[0], this.height + 2],
      [0, this.centerCoords[1]]
    ];

    this.doorEntranceCoords = [
        [this.centerCoords[0], 2],
        [this.width, this.centerCoords[1]],
        [this.centerCoords[0], this.height + 1],
        [1, this.centerCoords[1]]
    ];
}

ENGINE.Room.prototype.initTilesArray = function() {
  for(var x = 0; x < this.width + 2; x++) {
    this.tiles[x] = [];
    for(var y = 0; y < this.height + 3; y++) {
      this.tiles[x][y] = 0;
    }
  }
}


ENGINE.Room.prototype.initWalls = function() {
  // corners
  this.tiles[0][0] = ENGINE.Tileset._WALL_CORNER_TOP_LEFT;
  this.tiles[this.width+1][0] = ENGINE.Tileset._WALL_CORNER_TOP_RIGHT;
  this.tiles[0][this.height+2] = ENGINE.Tileset._WALL_CORNER_BOTTOM_LEFT;
  this.tiles[this.width+1][this.height+2] = ENGINE.Tileset._WALL_CORNER_BOTTOM_RIGHT;

  // horizontal walls (top & bottom)
  for(var x = 1; x < this.width + 1; x++) {
    this.tiles[x][0] = ENGINE.Tileset._WALL_TOP_A;
    this.tiles[x][1] = ENGINE.Tileset._WALL_TOP_B;
    this.tiles[x][this.height+2] = ENGINE.Tileset._WALL_BOTTOM;
  }

  // vertical walls (left & right)
  for(var y = 1; y < this.height + 2; y++) {
    this.tiles[0][y] = ENGINE.Tileset._WALL_LEFT;
    this.tiles[this.width+1][y] = ENGINE.Tileset._WALL_RIGHT;
  }

  this.tiles[0][1] = ENGINE.Tileset._WALL_CORNER_TOP_LEFT_B;
  this.tiles[this.width+1][1] = ENGINE.Tileset._WALL_CORNER_TOP_RIGHT_B;
}

ENGINE.Room.prototype.initDoors = function() {
  for(var i = 0; i < 4; i++) {
    if(this.openedDoor < 0 && this.doors[i] > 1) {
        this.openedDoor = i;
    }

    if(this.doors[i] > 0) {
      var x = this.doorsCoords[i][0];
      var y = this.doorsCoords[i][1];
      var state = i == this.openedDoor ? "opened" : "closed";

      this.doorSprites[i] = new ENGINE.Door(x, y, state, ENGINE.Tileset._DOOR_SPRITE[i]);

      if(i == this.openedDoor) {
          this.tiles[x][y] = ENGINE.Tileset._FLOOR_DISCOVERED;
      }
      else {
        this.tiles[x][y] = ENGINE.Tileset._OBSTACLE;
      }
    }
  }


  // set switchswitch
    if(!this.isEntrance && !this.isExit) {
        this.tiles[this.centerCoords[0]][this.centerCoords[1]] = ENGINE.Tileset._DOOR_SWITCH[this.openedDoor];
    }
    
  
}

ENGINE.Room.prototype.shiftDoorsTo = function(openedDoor) {
    //this.tiles[this.centerCoords[0]][this.centerCoords[1]] = ENGINE.Tileset._DOOR_SWITCH[openedDoor];

    if(!this.isEntrance && !this.isExit) {
        this.tiles[this.centerCoords[0]][this.centerCoords[1]] = ENGINE.Tileset._DOOR_SWITCH[this.openedDoor];
    }

    this.image = this.getImage();

    for(var i = 0; i < 4; i++) {
        if(this.doors[i] > 0) {
            var dx = this.doorsCoords[i][0];
            var dy = this.doorsCoords[i][1];

            if(i == openedDoor) {
                this.tiles[dx][dy] = ENGINE.Tileset._FLOOR_DISCOVERED;
            }
            else {
                this.tiles[dx][dy] = ENGINE.Tileset._OBSTACLE;
            }
        }
        
    }
}

ENGINE.Room.prototype.shiftDoorsState = function() {
    var isAnim = false;

    for(var i in this.doorSprites) {
        if(this.doorSprites[i].anim == true) {
            isAnim = true;
        }
    }

    if(isAnim) {
        return false;
    }

    this.openedDoor = (this.openedDoor + 1) % 4;
    // set switch
    this.tiles[this.centerCoords[0]][this.centerCoords[1]] = ENGINE.Tileset._DOOR_SWITCH[this.openedDoor];
    
    this.image = this.getImage();
    
    var shiftedDoors = 0;

    for(var i = 0; i < 4; i++) {
        if(this.doors[i] > 0) {
            if(this.openedDoor == i && this.doorSprites[i].state == "closed") {
                this.doorSprites[i].open();
                var dx = this.doorsCoords[i][0];
                var dy = this.doorsCoords[i][1];

                this.tiles[dx][dy] = ENGINE.Tileset._FLOOR_DISCOVERED;

                shiftedDoors++;
            }
            else if(this.doorSprites[i].state == "opened") {
                this.doorSprites[i].close();

                var dx = this.doorsCoords[i][0];
                var dy = this.doorsCoords[i][1];

                this.tiles[dx][dy] = ENGINE.Tileset._OBSTACLE;

                shiftedDoors++;
            }
        }
    }

    return shiftedDoors > 0;
}

ENGINE.Room.prototype.isDoorSwitch = function(x, y) {
    if(x > 0 && x < this.width + 1 && y > 0 && y < this.height + 2) {
        return ENGINE.Tileset._DOOR_SWITCH.indexOf(this.tiles[x][y]) >= 0
    }
    else {
        return false;
    }

}


ENGINE.Room.prototype.initFloor = function() {
  // clear
  for(var x = 1; x < this.width+1; x++)
  for(var y = 2; y < this.height+2; y++) {
    this.tiles[x][y] = ENGINE.Tileset._FLOOR;
  }
  
  if(this.isEntrance) {
    this.tiles[this.centerCoords[0]][this.centerCoords[1]] = ENGINE.Tileset._STAIRS_ENTRANCE;
  }
  else if(this.isExit) {
    this.tiles[this.centerCoords[0]][this.centerCoords[1]] = ENGINE.Tileset._STAIRS_EXIT;
  }
  else {
    this.tiles[this.centerCoords[0]][this.centerCoords[1]] = ENGINE.Tileset._DOOR_SWITCH[0];
  }
  
  // set obstacles
  var iObstacles = Math.floor(app.random() * 2) + 1;
  for(var i = 0; i < iObstacles; i++) {
    var ox = Math.floor(app.random() * Math.floor(this.width / 2)) + 1;
    var oy = Math.floor(app.random() * Math.floor(this.height / 2)) + 2;
    
    this.tiles[ox][oy] = ENGINE.Tileset._OBSTACLE;
    this.tiles[this.width - ox + 1][oy] = ENGINE.Tileset._OBSTACLE;
    this.tiles[this.width - ox + 1][this.height - oy + 3] = ENGINE.Tileset._OBSTACLE;
    this.tiles[ox][this.height - oy + 3] = ENGINE.Tileset._OBSTACLE;

  }

  // set spikes
  this.spikes = [];
  var spikes = 0;
  var spikesAmount = Math.floor(this.width * this.height / 8);

  while(spikes < spikesAmount) {
    var x = Math.floor(app.random() * this.width)+1;
    var y = Math.floor(app.random() * this.height)+2;

    // FLOOD FILL CHECK FOR DOORS AND SWITCH !!!!!!!!
    if(this.tiles[x][y] == ENGINE.Tileset._FLOOR /*&& this.evalTilePosition(x, y, ENGINE.Tileset._SPIKES)*/) {
      this.tiles[x][y] = ENGINE.Tileset._SPIKES;
      this.spikes.push(x + 'x' + y);
      spikes++;
    }
  }
}


ENGINE.Room.prototype.isWalkableTile = function(x, y) {
    if(x >= 0 && x <= this.width + 1 && y >= 0 && y <= this.height + 2) {
        return ENGINE.Tileset.isWalkable(this.tiles[x][y]);
    }
    else {
        return false;
    }
}


ENGINE.Room.prototype.putSprite = function(x, y, sprite, frame = 0) {
    var a = x + sprite.offset[0];
    var b = y + sprite.offset[1];

    for(var sx = 0; sx < sprite.size[0]; sx++)
    for(var sy = 0; sy < sprite.size[1]; sy++) {
        this.tiles[a + sx][b + sy] = sprite.frames[frame] + (sy * ENGINE.Tileset.tilesInRow + sx);
    }
}




ENGINE.Room.prototype.showHints = function(pos) {
    // Copy hints data
    var copy = [];
    for(var x = 0; x < this.width + 2; x++){
        copy[x] = [];
        for(var y = 0; y < this.height + 3; y++) {
            copy[x][y] = this.hints[x][y];
        }
    }

    var tilesToShow = [];

    // Put flood
    copy[pos[0]][pos[1]] = ENGINE.Tileset._NULL;

    tilesToShow.push(pos);
    

    var changed = true;

    while(changed == true) {
        changed = false;

        for(var x = 1; x < this.width + 1; x++)
        for(var y = 2; y < this.height + 2; y++) {
            if(copy[x][y] == ENGINE.Tileset._NULL) {
                // top
                if(y > 2 && copy[x][y-1] == ENGINE.Tileset._FLOOR /*ENGINE.Tileset.isWalkable(copy[x][y - 1])*/) {
                    copy[x][y - 1] = ENGINE.Tileset._NULL;
                    tilesToShow.push([x, y-1]);
                    changed = true;
                }

                // right
                if(x < this.width && copy[x+1][y] == ENGINE.Tileset._FLOOR /*ENGINE.Tileset.isWalkable(copy[x+1][y])*/) {
                    copy[x+1][y] = ENGINE.Tileset._NULL;
                    tilesToShow.push([x+1,y]);
                    changed = true;
                }

                // bottom
                if(y < this.height+1 && copy[x][y+1] == ENGINE.Tileset._FLOOR /*ENGINE.Tileset.isWalkable(copy[x][y + 1])*/) {
                    copy[x][y + 1] = ENGINE.Tileset._NULL;
                    tilesToShow.push([x,y+1]);
                    changed = true;
                }

                // left
                if(x > 1 && copy[x-1][y] == ENGINE.Tileset._FLOOR /*ENGINE.Tileset.isWalkable(copy[x-1][y])*/) {
                    copy[x-1][y] = ENGINE.Tileset._NULL;
                    tilesToShow.push([x-1,y]);
                    changed = true;
                }
            }
        }
    }

    var hintsToShow = [];

    // show hints
    for(var i = 0; i < tilesToShow.length; i++) {
        var neighbours = [[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1]];
        for(var n = 0; n < neighbours.length; n++) {
            var tx = tilesToShow[i][0] + neighbours[n][0];
            var ty = tilesToShow[i][1] + neighbours[n][1];

            if(tx > 0 && tx < this.width + 2 && ty > 0 && ty < this.height + 3) {
                if(ENGINE.Tileset.isWalkable(copy[tx][ty])) {
                    hintsToShow.push([tx,ty]);
                    copy[tx][ty] = ENGINE.Tileset._NULL;
                }
            }
        }
    }

    for(var i = 0; i < hintsToShow.length; i++) {
        tilesToShow.push(hintsToShow[i]);
    }


    var showedTiles = 0;

    // show
    for(var i = 0; i < tilesToShow.length; i++) {
        var x = tilesToShow[i][0];
        var y = tilesToShow[i][1];

        

        if(this.hints[x][y] == ENGINE.Tileset._FLOOR) {
            this.tiles[x][y] = ENGINE.Tileset._FLOOR_DISCOVERED;

            showedTiles++;
        }
        else if(this.tiles[x][y] == ENGINE.Tileset._FLOOR) {
            if(typeof(this.tiles[x][y]) != "undefined") {
                this.tiles[x][y] = this.hints[x][y];
                showedTiles++;
            }

            
        }

        
        
    }

    return showedTiles


}


ENGINE.Room.prototype.isSpikes = function(pos) {
    return this.spikes.indexOf(pos[0] + 'x' + pos[1]) >= 0 ? true : false;
}

ENGINE.Room.prototype.evaluate = function() {
    // flood should reach doors
    var floodTargets = [];

    for(var i = 0; i < 4; i++) {
        if(this.doors[i] > 0) {
            floodTargets.push(this.doorEntranceCoords[i]);
        }
    }

    // Copy tiles data
    var copy = [];
    for(var x = 0; x < this.width + 2; x++){
        copy[x] = [];
        for(var y = 0; y < this.height + 3; y++) {
            copy[x][y] = this.tiles[x][y];
        }
    }

    if(this.isEntrance) {
        if(!ENGINE.Tileset.isWalkable(copy[this.centerCoords[0]][this.centerCoords[1]-1])) {
            return false;
        }

        copy[this.centerCoords[0]][this.centerCoords[1]-1] = ENGINE.Tileset._NULL;
    }
    else {
        // Put flood on center - flood starts on the switch
        copy[this.centerCoords[0]][this.centerCoords[1]] = ENGINE.Tileset._NULL;
    }

    var changed = true;

    while(changed == true) {
        changed = false;

        for(var x = 1; x < this.width + 1; x++)
        for(var y = 2; y < this.height + 2; y++) {
            if(copy[x][y] == ENGINE.Tileset._NULL) {
                // top
                if(y > 2 && ENGINE.Tileset.isWalkable(copy[x][y - 1])) {
                    copy[x][y - 1] = ENGINE.Tileset._NULL;
                    changed = true;
                }

                // right
                if(x < this.width && ENGINE.Tileset.isWalkable(copy[x+1][y])) {
                    copy[x+1][y] = ENGINE.Tileset._NULL;
                    changed = true;
                }

                // bottom
                if(y < this.height+1 && ENGINE.Tileset.isWalkable(copy[x][y + 1])) {
                    copy[x][y + 1] = ENGINE.Tileset._NULL;
                    changed = true;
                }

                // left
                if(x > 1 && ENGINE.Tileset.isWalkable(copy[x-1][y])) {
                    copy[x-1][y] = ENGINE.Tileset._NULL;
                    changed = true;
                }
            }
        }
    }

    // check flood targets after flood fill
    var allFlooded = true;

    for(i in floodTargets) {
        var x = floodTargets[i][0];
        var y = floodTargets[i][1];

        if(copy[x][y] !== ENGINE.Tileset._NULL) {
            allFlooded = false;
        }
    }

    return allFlooded;
}


ENGINE.Room.prototype.initFloorHints = function() {
    this.hints = [];

    var neighbours = [[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1]];

    for(var x = 0; x < this.width + 2; x++) {
        this.hints[x] = [];
        for(var y = 0; y < this.height + 3; y++) {

            if(this.tiles[x][y] == ENGINE.Tileset._FLOOR) {
                var neighbouringSpikes = 0;

                for(var i = 0; i < neighbours.length; i++) {
                    var tx = x + neighbours[i][0];
                    var ty = y + neighbours[i][1];

                    if(tx > 0 && tx < this.width + 2 && ty > 0 && ty < this.height + 3) {
                        if(this.tiles[tx][ty] == ENGINE.Tileset._SPIKES) {
                            neighbouringSpikes++;
                        }
                    }
                }

                if(neighbouringSpikes == 0) {
                    this.hints[x][y] = ENGINE.Tileset._FLOOR;
                }
                else {
                    this.hints[x][y] = ENGINE.Tileset._NUMBERS_FIRST + neighbouringSpikes - 1;
                }
                
            }
            
        }
    }
}

ENGINE.Room.prototype.showAllHints = function() {
    for(var x = 1; x < this.width + 1; x++)
    for(var y = 2; y < this.height + 2; y++) {
        if(this.tiles[x][y] == ENGINE.Tileset._FLOOR) {
            this.tiles[x][y] = this.hints[x][y];
        }
    }
}

ENGINE.Room.prototype.hideSpikes = function() {
    for(var s = 0; s < this.spikes.length; s++) {
        var pos = this.spikes[s].split('x');
        var x = pos[0] * 1;
        var y = pos[1] * 1;

        this.tiles[x][y] = ENGINE.Tileset._FLOOR;
        //console.log(pos);
    }
}


ENGINE.Room.prototype.getImage = function() {
  var canvas = document.createElement('canvas');
  canvas.width = (this.width + 2) * ENGINE.Tileset.width;
  canvas.height = (this.height + 3) * ENGINE.Tileset.height;
  var ctx = canvas.getContext("2d");


  for(var x = 0; x < this.width + 2; x++)
  for(var y = 0; y < this.height + 3; y++) {
    var tile = this.tiles[x][y];
    var tilePos = ENGINE.Tileset.tilePos(tile);

    var dx = x * ENGINE.Tileset.width;
    var dy = y * ENGINE.Tileset.height;

    ctx.drawImage(ENGINE.Tileset.image, tilePos[0], tilePos[1], ENGINE.Tileset.width, ENGINE.Tileset.height, dx, dy, ENGINE.Tileset.width, ENGINE.Tileset.height);
  }

  return canvas;
}