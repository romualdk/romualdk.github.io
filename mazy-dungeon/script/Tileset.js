ENGINE.Tileset = {
  tilesInRow: 10,
  width: 16,
  height: 16,
  spaceX: 0,
  spaceY: 0,
  image: null,

  _NULL: 0,
  _FLOOR: 1,
  _FLOOR_DISCOVERED: 2,
  _SPIKEHOLES: 3,
  _SPIKES: 4,
  _OBSTACLE: 5,
  _GRAVE: 9,
  _SWITCH: 6,
  _STAIRS_ENTRANCE: 113,
  _STAIRS_EXIT: 114,

  _PLAYER: 142,
  _PLAYER_HURT: 152,

  _HEART: 140,
  _HEART_EMPTY: 150,

  _COIN: [130,131,140,141,150,151],

  _DOOR_SWITCH: [128,129,139,138],

  _NUMBERS_FIRST: 11,
  _NUMBERS_LAST: 18,

  _WALL_TOP_A: 116,
  _WALL_TOP_B: 126,
  _WALL_RIGHT: 119,
  _WALL_BOTTOM: 136,
  _WALL_LEFT: 118,
  _WALL_CORNER_TOP_LEFT: 115,
  _WALL_CORNER_TOP_LEFT_B: 125,
  _WALL_CORNER_TOP_RIGHT: 117,
  _WALL_CORNER_TOP_RIGHT_B: 127,
  _WALL_CORNER_BOTTOM_LEFT: 135,
  _WALL_CORNER_BOTTOM_RIGHT: 137,

  _DOOR_SPRITE: [
    {
      size: [3, 2],
      offset: [-1, -1],
      frames: [21,51,81,26,56,86]
    },
    {
      size: [1,3],
      offset: [0,-1],
      frames: [24,54,84,29,59,89]
    },
    {
      size: [3,1],
      offset: [-1, 0],
      frames: [41,71,101,46,76,106]
    },
    {
      size: [1,3],
      offset: [0,-1],
      frames: [20,50,80,25,55,85]
    },
  ],

  _DOOR_OPENED_TOP: 28,
  _DOOR_OPENED_RIGHT: 29,
  _DOOR_OPENED_BOTTOM: 30,
  _DOOR_OPENED_LEFT: 31,
  _DOOR_CLOSED_TOP: 37,
  _DOOR_CLOSED_RIGHT: 38,
  _DOOR_CLOSED_BOTTOM: 39,
  _DOOR_CLOSED_LEFT: 40,

  _WALKABLES: [1,2,11,12,13,14,15,16,17],

  isWalkable: function(tile) {
    return ENGINE.Tileset._WALKABLES.indexOf(tile) >= 0 ? true : false;
  },

  isObstacle: function(tile) {
    return !ENGINE.Tileset.isWalkable(tile);
  },

  tilePos: function(tile) {
    return [
      (tile % ENGINE.Tileset.tilesInRow) * (ENGINE.Tileset.width + ENGINE.Tileset.spaceX),
      Math.floor(tile / ENGINE.Tileset.tilesInRow) * (ENGINE.Tileset.height + ENGINE.Tileset.spaceY)
    ];
  },

  tileFromPos: function(pos) {
    return pos[1] * ENGINE.Tileset.tilesInRow + pos[0];
  }

/*

   tilesInRow: 9,
  width: 16,
  height: 16,
  spaceX: 1,
  spaceY: 1,
  image: null,

  _NULL: 0,
  _FLOOR: 1,
  _FLOOR_DISCOVERED: 2,
  _SPIKEHOLES: 3,
  _SPIKES: 4,
  _OBSTACLE: 5,
  _SWITCH: 6,
  _NUMBERS_FIRST: 10,
  _NUMBERS_LAST: 17,
  _WALL_TOP_A: 18,
  _WALL_TOP_B: 19,
  _WALL_RIGHT: 20,
  _WALL_BOTTOM: 21,
  _WALL_LEFT: 22,
  _WALL_CORNER_TOP_LEFT: 23,
  _WALL_CORNER_TOP_RIGHT: 24,
  _WALL_CORNER_BOTTOM_LEFT: 25,
  _WALL_CORNER_BOTTOM_RIGHT: 26,
  _DOOR_OPENED_TOP: 28,
  _DOOR_OPENED_RIGHT: 29,
  _DOOR_OPENED_BOTTOM: 30,
  _DOOR_OPENED_LEFT: 31,
  _DOOR_CLOSED_TOP: 37,
  _DOOR_CLOSED_RIGHT: 38,
  _DOOR_CLOSED_BOTTOM: 39,
  _DOOR_CLOSED_LEFT: 40,

  _WALKABLES: [1,2, 10,11,12,13,14,15,16,17, 28,29,30,31],

  isWalkable: function(tile) {
    return ENGINE.Tileset._WALKABLES.indexOf(tile) >= 0 ? true : false;
  },

  isObstacle: function(tile) {
    return !ENGINE.Tileset.isWalkable(tile);
  },

  tilePos: function(tile) {
    return [
      (tile % ENGINE.Tileset.tilesInRow) * (ENGINE.Tileset.width + ENGINE.Tileset.spaceX),
      Math.floor(tile / ENGINE.Tileset.tilesInRow) * (ENGINE.Tileset.height + ENGINE.Tileset.spaceY)
    ];
  }*/
};