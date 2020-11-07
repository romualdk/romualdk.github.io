
/**
 * AUDIO
 * http://github.grumdrig.com/jsfxr/
 */
var audioSrc = {
  jump: 'data:audio/wav;base64,UklGRs0EAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YakEAACkpKR+W1tbW1tbW1tbgaSkoVtbW1tbW1tbW2KkpKR2W1tbW1tcXFxckaSkj1xcXFxcXFxcXH2kpKJcXFxcXFxcXFxtpaWlaFxcXFxcXFxcYqWlpXNcXFxcXFxcXFykpaV4XFxcXFxcXFxcoqWlelxcXFxcXFxcXKWlpXVcXFxcXFxdXWWlpaVsXV1dXV1dXV1xpaWlX11dXV1dXV1dgqalll1dXV1dXV1dXZimpn9dXV1dXV1dXWqmpqZjXV1dXV1dXV2HpqaOXV1dXV1dXV1hpqama11dXV1dXV1dh6amjF1dXV1dXl5eaqampmBeXl5eXl5eXpqmpnheXl5eXl5eXoSmpoxeXl5eXl5eXnSnp5xeXl5eXl5eXmenp6dfXl5eXl5eXl6np6dnXl5eXl5eXl6ip6drXl5eXl5eXl6hp6drXl5eXl5eXl6lp6dmXl5eX19fX2Onp6dfX19fX19fX2+np5tfX19fX19fX32np4xfX19fX19fX5GoqHhfX19fX19fX6ioqGBfX19fX19feaiojl9fX19fX19fl6iob19fX19fX19wqKiVX19fX19fX1+WqKhuX19fX2BgYHaoqI5gYGBgYGBgYKKnp2FgYWFhYWFhiqeneGFhYWFhYWF3pqaKYmJiYmJiYmemppliYmJiYmJiY56lpWNjY2NjY2NjlKWla2NjY2NjZGSOpKRxZGRkZGRkZIukpHNkZGRkZWVli6OjcmVlZWVlZWWOo6NwZWVlZmZmZpOiompmZmZmZmZmm6KcZmZmZ2dnZ2qhoZFnZ2dnZ2dnd6CghGdnaGhoaGiHoKB0aGhoaGhoaJifmWhoaWlpaWl1n5+FaWlpaWlpaYqennBpaWpqampsnp6NampqampqaoWdnXNqampra2tunZ2La2tra2tra4qcnG5ra2trbGx3nJyBbGxsbGxsbJabkWxsbGxsbG2Hm5pwbW1tbW1te5qafW1tbW1tbXGZmYZubm5ubm5ulJmNbm5ubm5ubo2YlG5vb29vb2+ImJdvb29vb29vhZeXcW9vb3BwcISXl3NwcHBwcHCElpZzcHBwcHBwhZaWcXFxcXFxcYiVknFxcXFxcXGMlY1xcXJycnJykZSHcnJycnJydpSTgHJycnJyc36Tk3hzc3Nzc3OGko9zc3Nzc3Nzj5KFc3R0dHR0e5GRe3R0dHR0dIaRjXR0dHR0dHWQkIF1dXV1dXWCkJB1dXV1dXV1jo+DdXV2dnZ2gY+PdnZ2dnZ2do6OgXZ2dnZ2doSOind3d3d3d3uNjXx3d3d3d3eJjYR3d3d3d3iCjIp4eHh4eHh9i4t7eHh4eHh4i4uAeHh4eXl5hoqDeXl5eXl5g4qGeXl5eXl5gImIeXl6enp6fomJe3p6enp6fYiIfHp6enp6fIiIfXt7e3t7fIeHfnt7e3t7fIeHfnt7e3t7fYaGfXx8fHx8foaGfXx8fHx8f4WFfHx8fHx8gIWDfX19fX19gYSCfX19fX19goOAfX19fX19g4N/fX5+fn5/goJ+fn5+fn6AgoF+fn5+fn6BgYB+fn9/f3+BgX9/f39/f4CAgH9/f39/f4CAgH9/fw==',
  shoot: 'data:audio/wav;base64,UklGRqsBAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YYcBAACWWmufcG2QiWp4qGVwn3hshplncqZybYiYZ3GkdmyApWRwmoVpc6tubYKmY2+SkmZxn4Fpc6h3a3Sub2x3rmxseK5sbHeucGt0rHVqc6WCZ3KbkWRwjKZjbXmuc2lzoJBjcIaraWt0pYxjcISsbWlznJxgbXWshmRwgK52Z3GLqm1ocpKnaGlzlKdoaXOQqG1ncoesd2VwfKyLYG51o59iaXOMqnljb3apnGFpc4athl9tdZqlcmRwd6SiaGZxd6mgZWZxd6ihaWVwd6GjdWFudpOpiltrdICrnWRlcHeZp4hba3R8qqBzYG51hKycamJvdoasm2phbnaDq510Xm11eqiihltocniQq5hpYG51eqeijF5lcXeCqZ6GXGdxeIOpnoldZXF3fKeik2NgbnV6kayYf1lncnh7paSUc1lqc3mAp6GTcllqc3l8pKWUfVpmcXd7j6yaj2ZcbHR5fJ2olopgX211enycqJeNZltrdHl8jqqcj3taZHB3en2aqZeNdlhlcXd7',
  hurt: 'data:audio/wav;base64,UklGRgcCAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YeMBAAB4e1F+fW+SfJKKkZdte5JpeHRveWqMgJKTgpSIepR1X3hgf3yAdq2LaIp/cniag5Z4emmDeIaGl4x8eGCmjoWFh32BboSXhXqEdJduhohtXHN4ZXZ5XqF+a3Okc3CJeoePi453k5eLoX5tZHGxcniLmXGSeH6JimtyYmqEZpRkYJh7kX2Bb4+fgHuDqZSNd3ZxcV9XlouFf415eX5tbXOdn3J+VmyiqKJ5doZxn2l0cpFyiHdod6eLf3V5mYF8eWaNg2RxYoeda3hggX2VnZF6oYOGa3GHo3V5iX+OZIudoJZxYFxwb295hI6hk5d7jYeFbo6abW2QoI+Ra3uQd2h8XoCQalhdaYyYmZOOeG+Ta4F8aIOFem+KkGuQeISbcGp2l4mLlIyDc29sYG58cGyHhHR+lIVrcXuCj4loaYyOkZOQiYmJgoOJfHF3eYqId3l+em11k49oan+BiY2Ec3SQkoZ0dIKHhnV1dnV2d4eGho6PjomCgoJ1cXJzi4+OjouKiYmIeXl5enqFiIiHh4Z1dXV2dnd5fH19fX19fX6HhoaFhYWEhISDgHt7e3x8fHx9fX19fX1+fn5+gIKCgn57fHx/hISDg319fX1+f39/f4CBgYGAgH9+fn9/f4CAgICAgIA=',
  powerup: 'data:audio/wav;base64,UklGRl0EAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YTkEAACkpKSHW1tbhKSkpF1bW2ikpKR3W1tbmqSki1tbW4ekpJxbW1t6pKSkX1tbcaSkpGVbW2ykpKRoW1tspKSkZVtbcaSkpF9bW3qkpJxbW1uHpKSNW1tbmaSkeltbZaSkpGJbW36kpI9bW1ucpKRwW1t0pKSWW1tbmqSkbltbeqSkjFtbXaSkpF9bW1uDpKSkYFtbZKSkpHxbW1uTpKSUW1tbfqSkpF1bW2+kpKRrW1tjpKSkdFtbXKSkpHlbW1ujpKR5W1tcpKSkdFtbY6SkpGtbW2+kpKReW1t9pKSWW1tbkaSkgVtbYKSkpGdbW3ukpJJbW1ubpKRxW1t1pKSUW1tbnKSka1tbf6SkiFtbZKSkpIBbW1uLpKSfW1tbb6SkpHFbW1ugpKSGW1tbjKSkl1tbW32kpKRbW1t0pKSkYlxccKSko2VcXG+jo6NkXFxyo6OjX11deqOjm11dXYaioo5dXV2WoqJ7Xl5loqKiZl5efaGhkF5eXpehoXVfX3KhoZdfX1+ToKB0X193oKCQX19gnqCgZ2BgYH6fn59pYGBin5+fg2BhYYqfn5dhYWF4np6eamFhap6ennZiYmKcnp5/YmJilZ2dg2JiYpKdnYRiY2OTnZ2CY2Njl5yce2NjZpycnHJjZHKcnJxmZGSAm5uOZGRkkZube2Rlb5ubm2ZlZYabmoNlZWmampppZWWFmpqBZmZwmpqVZmZmkJmZkGZmZniZmZlzZ2dnlpmZhmdnZ4SYmJVnZ2d3mJiYcGhobpiYl3hoaGiXl5d+aGhok5eXgGlpaZKXln9paWmTlpZ7aWlslpaWdWpqc5aWlW1qan2VlY5qamqJlZWAa2ttlZWVcmtrfZSUimtra4+UlHdsbHuUlIpsbGyQk5NzbGyAk5OCbGxtbZOTk4RtbW2CkpKSbm1tdJKSkntubm6OkpKEbm5uhZGRi25ubn+RkZBvb297kZGRcG9vepCQkHFvb3uQkJBwcHB9kJCNcHBwgo+Ph3BwcIePj4FwcXGPj494cXF6jo6McXFxhY6OgXFxdI6OjnRycoGNjYJycnSNjY10cnKEjY1+c3N6jYyMfHNzc4eMjIdzc3N9jIyMeHR0dYyLi390dHSGi4uFdHR0gYuLiXV1dX6Kiop2dXV8ioqKd3V1fIqKind2dn2JiYl2dnZ/iYmHdnZ2gomJg3d3d4WIiH93d3mIiIh6d3d/iIiEeHh4hYeHfXh4fIeHhXh4eIOHh354eX2Hh4R5eXmFhoZ7eXmAhoaGenl5e4aGhoB6enqChYWEenp6foWFhXx6enyFhYR+e3t7hISEgHt7e4KEhIB7e3yChIOBfHx8goODgHx8fIKDg4B8fHyCg4J/fX19goKCfn19f4KCgX19fYCCgoB+fn6BgYF/fn5/gYGAfn5+gIGBf39/f4CAgH9/f4CAgH9/f4CAgIB/'

}

var sound = {}

function initSound () {
  for (var i in audioSrc) {
    sound[i] = document.createElement('AUDIO')
    sound[i].src = audioSrc[i]
  }
}

initSound()

/**
 * SCREEN
 */

var gamescreen = document.createElement('canvas')
var gamectx = gamescreen.getContext('2d')
gamescreen.width = 420
gamescreen.height = 180

var scale = 1

var canvas = document.getElementById('screen')
var ctx = canvas.getContext('2d')
canvas.width = gamescreen.width * scale
canvas.height = gamescreen.height * scale

var smoothing = 0

gamectx.mozImageSmoothingEnabled = smoothing
gamectx.msImageSmoothingEnabled = smoothing
gamectx.webkitImageSmoothingEnabled = smoothing
gamectx.imageSmoothingEnabled = smoothing

window.addEventListener('resize', resizeCanvas, false)

resizeCanvas()

function resizeCanvas () {
  scale = Math.floor(window.innerWidth / gamescreen.width)
  scale = scale < 1 ? 1 : (scale > 2 ? 2 : scale)

  canvas.width = gamescreen.width * scale
  canvas.height = gamescreen.height * scale

  document.getElementById('info').style.width = canvas.width + 'px'
}

/**
 * Color tables
 */
var colorScheme = {}

colorScheme.standard = {
  colors: [
    [ 0, 0, 0], // black - outline
    [255, 156, 18], // orange - tone
    [255, 255, 255], // white - highlight,
    [250, 188, 32], // yellow - ground,
    [196, 98, 0], // brown - ground marks
    [ 66, 154, 215], // blue - sky,
    [127, 213, 205], // light-blue - sky anti-aliasing
    [247, 247, 247], // gray - clouds
    [ 53, 128, 0], // green - plants / animals
    [255, 41, 80] // red - enemies
  ],
  groundColor: 3,
  skyColor: 5,
  cloudColor: 7,
  colorMap: {
    0: 0,
    127: 1,
    255: 2
  },
  palettes: [
    [0, 1, 2], // sprites
    [5, 6, 7], // sky / clouds
    [0, 3, 4], // ground
    [0, 4, 1], // rocks
    [0, 8, 3], // plants
    [0, 8, 2], // animals
    [0, 9, 3] // read enemies
  ],
  // Palette index for each 32x32 px block on tileset
  palleteMap: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    3, 3, 4, 0,
    5, 6, 0, 0,
    1, 1, 1, 2,
    0, 0, 0, 0
  ]
}

colorScheme.grayscale = {
  colors: [
    [ 0, 0, 0], // black
    [160, 160, 160], // gray
    [247, 247, 247] // white
  ],
  groundColor: 1,
  skyColor: 2,
  cloudColor: 2,
  colorMap: {
    0: 0,
    127: 1,
    255: 2
  },
  palettes: [
    [0, 1, 2], // sprites
    [2, 2, 2], // sky / clouds
    [0, 1, 0] // ground
  ],
  // Palette index for each 32x32 px block on tileset
  palleteMap: [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    1, 1, 1, 2
  ]
}

// var currentColorScheme = 'standard';
var currentColorScheme = 'grayscale'

/**
 * TILESET
 */
var chrtable = new Image()
chrtable.src = 'data:image/png;base64,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'

var tileset = document.getElementById('tileset') // document.createElement('canvas');
var tilesetCtx = tileset.getContext('2d')
tileset.width = 128
tileset.height = 256

function colorizeTileset () {
  tilesetCtx.drawImage(chrtable, 0, 0)
  var imageData = tilesetCtx.getImageData(0, 0, 128, 256)
  var data = imageData.data

  var scheme = colorScheme[currentColorScheme]

  for (var y = 0; y < 256; y++) {
    for (var x = 0; x < 128; x++) {
      var index = (y * 128 + x) * 4
      var colorIndex = scheme.colorMap[data[index]]
      var palMap = Math.floor(y / 32) * 4 + Math.floor(x / 32)
      var pal = scheme.palleteMap[palMap] ? scheme.palleteMap[palMap] : 0
      var color = scheme.colors[scheme.palettes[pal][colorIndex]]

      data[index] = color[0]
      data[index + 1] = color[1]
      data[index + 2] = color[2]
    }
  }

  tilesetCtx.putImageData(imageData, 0, 0)
}

function getTilePos (tile) {
  return [
    (tile % 8) * 16,
    Math.floor(tile / 8) * 16
  ]
}

/**
 * Layers
 */

var ground = document.getElementById('ground')
groundCtx = ground.getContext('2d')

function initGround () {
  ground.width = Math.ceil(gamescreen.width / 80) * 80
  ground.height = Math.floor(gamescreen.height / 4)

  var scheme = colorScheme[currentColorScheme]
  var color = scheme.colors[scheme.groundColor]

  groundCtx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  groundCtx.fillRect(0, 0, ground.width, ground.height)

  var stamps = Math.floor(5 + Math.random() * 3)
  var pos = getTilePos(70)

  var step = Math.floor(ground.width / stamps)
  var devStep = Math.floor(step / 3)
  var devVert = Math.floor(ground.height / 8)

  for (var i = 0; i < stamps; i++) {
    var dx = 16 + i * step + devStep - Math.floor(Math.random() * devStep * 2)
    var dy = Math.floor(ground.height / 3) + devVert - Math.floor(Math.random() * devVert * 2)
    groundCtx.drawImage(tileset, pos[0], pos[1], 32, 32, dx, dy, 32, 32)
  }
}

var sky = document.getElementById('sky')
skyCtx = sky.getContext('2d')

function initSky () {
  sky.width = ground.width
  sky.height = gamescreen.height - ground.height
  var thirdHeight = Math.floor(sky.height / 3)

  var scheme = colorScheme[currentColorScheme]
  var color = scheme.colors[scheme.skyColor]

  skyCtx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  skyCtx.fillRect(0, 0, sky.width, sky.height - thirdHeight)

  var color = scheme.colors[scheme.cloudColor]

  skyCtx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
  skyCtx.fillRect(0, sky.height - thirdHeight, sky.width, thirdHeight)

  var pos = getTilePos(64)

  for (var i = 0; i < sky.width / 80; i++) {
    var dx = i * 80
    var dy = sky.height - thirdHeight - 32

    skyCtx.drawImage(tileset, pos[0], pos[1], 80, 32, dx, dy, 80, 32)
  }
}

/**
 * GAME LOOP
 */
var now

var dt = 0

var last = timestamp()

var slow = 1

var step = 1 / 60

var slowStep = slow * step

function timestamp () {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
}

function frame () {
  now = timestamp()
  dt = dt + Math.min(1, (now - last) / 1000)

  while (dt > slowStep) {
    dt = dt - slowStep
    update(step)
  }

  render(dt / slow)

  last = now

  requestAnimationFrame(frame)
}

/**
 * MISC
 */
function isMobile () {
  if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true
  } else {
    return false
  }
}

var spritesheet = {
  player: {
    width: 32,
    height: 32,
    /* tiles: [
            0, // stand
            2, // walk 1
            4, // walk 2
            6, // dodge,
            8, // jump
            10, // look up
            12, // look back
            14 // hurt
        ], */
    animations: {
      stand: [0],
      walk: [0, 2, 0, 4],
      jump: [16],
      hurt: [22]
    },
    animationSpeed: 8,
    currentAnimation: 'stand'
  }
}

/**
 * SPRITE
 */
function Sprite (sprite) {
  this.x = 0
  this.y = 0
  this.vx = 0
  this.vy = 0
  this.ax = 0
  this.ay = 0
  this.jumping = false
  this.width = spritesheet[sprite].width
  this.height = spritesheet[sprite].height
  this.animations = {}
  this.animationSpeed = spritesheet[sprite].animationSpeed
  this.currentAnimation = spritesheet[sprite].currentAnimation
  this.currentAnimationTile = 0

  for (var a in spritesheet[sprite].animations) {
    this.animations[a] = []

    for (var i in spritesheet[sprite].animations[a]) {
      this.animations[a][i] = getTilePos(spritesheet[sprite].animations[a][i])
    }
  }
}

Sprite.prototype.update = function (dt) {
  this.currentAnimationTile = (this.currentAnimationTile + this.animationSpeed * dt) % this.animations[this.currentAnimation].length

  var ay = this.ay + (gravity * 100)

  this.vx += this.ax * dt
  this.vy += ay * dt

  this.x += this.vx * dt
  this.y += this.vy * dt

  if (this.y + this.height > spriteGroundY) {
    this.y = spriteGroundY - this.height
  }

  this.jumping = this.y + this.height < spriteGroundY

  if (this.jumping) {
    this.setCurrentAnimation('jump')
  } else {
    this.setCurrentAnimation('walk')
  }
}

Sprite.prototype.setCurrentAnimation = function (animation) {
  if (animation !== this.currentAnimation) {
    this.currentAnimation = animation
    this.currentAnimationTile = 0
  }
}

Sprite.prototype.getCurrentTile = function () {
  return this.animations[this.currentAnimation][Math.floor(this.currentAnimationTile)]
}

/**
 * PLAYER
 */
var player = new Sprite('player')

function initPlayer () {
  spriteGroundY = gamescreen.height - ground.height + 4
  player.x = 16
  player.y = spriteGroundY - player.height
  player.currentAnimation = 'walk'
}

player.jump = function () {
  this.vy = -300
  sound.jump.play()
}

player.shoot = function () {
  if (bullets.length < 20) {
    addBullet(this.x + 32, this.y + 18)

    sound.shoot.play()
  }
}

/**
 * BULLETS
 */
var bullets = []

function Bullet (id, x, y) {
  var tilePos = getTilePos(38)

  this.id = id
  this.x = x
  this.y = y
  this.sx = tilePos[0]
  this.sy = tilePos[1]
  this.width = 5
  this.height = 5

  this.vx = 250
}

Bullet.prototype.update = function (dt) {
  this.x += this.vx * dt

  if (this.x > gamescreen.width) {
    removeBullet(this.id)
  }
}

function addBullet (x, y) {
  var id = bullets.length
  bullets[id] = new Bullet(id, x, y)
  bullets[id].vx += Math.floor(10 - Math.random() * 20)
}

function removeBullet (id) {
  bullets.splice(id, 1)

  for (var i in bullets) {
    bullets[i].id = i
  }
}

/**
 * OBSTACLES
 */
var obstacleTiles = [34, 35, 36, 37, 40, 41, 42, 44, 45]
var obstacles = []
var obstacleTimer = 0
var obstacleWait = 3

function Obstacle (id, x, y) {
  var tile = obstacleTiles[Math.floor(Math.random() * obstacleTiles.length)]

  var tilePos = getTilePos(tile)

  this.id = id
  this.x = x
  this.y = y - 14
  this.sx = tilePos[0]
  this.sy = tilePos[1]
  this.width = 16
  this.height = 16

  this.vx = -groundSpeed
}

Obstacle.prototype.update = function (dt) {
  // this.x -= this.vx * dt;
  this.x += groundSpeed * dt

  if (this.x < -this.width) {
    removeObstacle(this.id)
  }
}

function addObstacle (x, y) {
  var id = obstacles.length
  obstacles[id] = new Obstacle(id, x + Math.floor(Math.random() * 50), y)
}

function removeObstacle (id) {
  obstacles.splice(id, 1)

  for (var i in obstacles) {
    obstacles[i].id = i
  }
}

/**
 * CONTROLS
 */
document.addEventListener('touchstart', function (event) {
  if (!isDead) {
    var touches = event.changedTouches

    // left half of the window click
    if (touches[0].pageX < window.innerWidth / 2 && !player.jumping) {
      player.jump()
    }
    // right half of the window click
    else if (touches[0].pageX > window.innerWidth / 2) {
      player.shoot()
    }
  } else {
    startGame()
  }
})

document.addEventListener('click', function (event) {
  if (!isDead) {
    // left half of the window click
    if (event.clientX < window.innerWidth / 2 && !player.jumping) {
      player.jump()
    }
    // right half of the window click
    else if (event.clientX > window.innerWidth / 2) {
      player.shoot()
    }
  } else {
    startGame()
  }
})

document.addEventListener('keypress', function (event) {
  if (!isDead) {
    // Z - jump
    if (event.key == 'z' && !player.jumping) {
      player.jump()
    }

    // X - shoot
    if (event.key == 'x') {
      player.shoot()
    }

    // C - switch color
    if (event.key == 'c' && currentColorScheme == 'standard') {
      currentColorScheme = 'grayscale'
      resetGameColors()
    } else if (event.key == 'c' && currentColorScheme == 'grayscale') {
      currentColorScheme = 'standard'
      resetGameColors()
    }
  } else {
    if (event.key == 'z' || event.key == 'x') {
      startGame()
    }
  }
})

/**
 * HUD
 */
var pointsCanvas = document.createElement('canvas')
var pointsCtx = pointsCanvas.getContext('2d')
pointsCanvas.width = 5 * 8
pointsCanvas.height = 8

function renderPoints () {
  /* pointsCtx.fillStyle = colorScheme[currentColorScheme].skyColor;
    pointsCtx.fillRect(0,0,pointsCanvas.width,pointsCanvas.height); */

  /* var str = "00000" + Math.floor(points);
    str = str.substr(str.length-size); */
  pointsCtx.clearRect(0, 0, pointsCanvas.width, pointsCanvas.height)

  var str = String('00000' + Math.floor(points)).slice(-5)

  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i)

    pointsCtx.drawImage(tileset, (code - 48) * 8, 160, 8, 8, i * 8, 0, 8, 8)
  }
}

function renderHud () {
  renderPoints()
  gamectx.drawImage(pointsCanvas, gamescreen.width - pointsCanvas.width - 4, 4)
}

function renderGameOver () {
  if (isDead == false || highScore == 0) {
    return false
  }

  var str = 'GAME OVER'
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i)

    if (code >= 65 && code <= 90) {
      var sx = Math.floor((code - 65) % 16) * 8
      var sy = 168 + Math.floor((code - 65) / 16) * 8

      gamectx.drawImage(tileset, sx, sy, 8, 8, Math.floor(gamescreen.width / 2) - 36 + i * 8, 32, 8, 8)
    }
  }
}

/**
 * GAME LOGIC
 */
var gravity = 9.8
var groundPos = 0
var groundSpeed = -350
var spriteGroundY

var skyPos = 0
var skySpeed = Math.floor(groundSpeed / 10)

var isDead = false
var speedTimer = 0
var speedWait = 10

var points = 0
var highScore = 0

chrtable.onload = function () {
  resetGameColors()
  resetGame()
  isDead = true
  requestAnimationFrame(frame)
}

function resetGameColors () {
  colorizeTileset()
  initGround()
  initSky()
}

function resetGame () {
  bullets = []
  obstacles = []
  groundSpeed = -150
  skySpeed = -15
  points = 0
  initPlayer()
  isDead = false
}

function startGame () {
  currentColorScheme = 'standard'
  resetGameColors()
  resetGame()
  sound.powerup.play()
}

function update (dt) {
  for (var i in bullets) {
    bullets[i].update(dt)
  }

  if (isDead) {
    return false
  }

  points += 1.5 * dt

  speedTimer += dt
  obstacleTimer += dt

  if (speedTimer >= speedWait) {
    groundSpeed -= 50
    skySpeed = Math.floor(groundSpeed / 10)

    sound.powerup.play()

    speedTimer = 0
  }

  if (obstacleTimer >= obstacleWait) {
    addObstacle(gamescreen.width + 16, spriteGroundY)
    obstacleTimer = 0
  }

  for (var i in obstacles) {
    obstacles[i].update(dt)
  }

  groundPos += groundSpeed * dt
  if (groundPos < 0) {
    groundPos += ground.width
  }

  skyPos += skySpeed * dt
  if (skyPos < 0) {
    skyPos += sky.width
  }

  player.update(dt)

  // Collision detection
  var collision = false
  var i = 0
  while (!collision && i < obstacles.length) {
    // broead phase
    if (obstacles[i].x < 64) {
      // narrow phase
      var a = (obstacles[i].x + 8) - (player.x + 16)
      var b = (obstacles[i].y + 8) - (player.y + 16)
      var distance = Math.sqrt(a * a + b * b)

      if (distance <= 16) {
        collision = true
        isDead = true

        if (points > highScore) {
          highScore = points
        }

        player.setCurrentAnimation('hurt')
        sound.hurt.play()
      }
    }

    i++
  }
}

function render (dt) {
  gamectx.clearRect(0, 0, gamescreen.width, gamescreen.height)

  // Ground
  gamectx.drawImage(ground, Math.floor(groundPos), gamescreen.height - ground.height)
  gamectx.drawImage(ground, 0, 0, ground.width, ground.height, Math.floor(groundPos - ground.width), gamescreen.height - ground.height, ground.width, ground.height)

  // Sky
  gamectx.drawImage(sky, Math.floor(skyPos), 0)
  gamectx.drawImage(sky, 0, 0, sky.width, sky.height, Math.floor(skyPos - sky.width), 0, sky.width, sky.height)

  // Obstacles
  for (var i in obstacles) {
    gamectx.drawImage(tileset, obstacles[i].sx, obstacles[i].sy, obstacles[i].width, obstacles[i].height, Math.floor(obstacles[i].x), Math.floor(obstacles[i].y), obstacles[i].width, obstacles[i].height)
  }

  // Player
  var tile = player.getCurrentTile()
  gamectx.drawImage(tileset, tile[0], tile[1], player.width, player.height, Math.floor(player.x), Math.floor(player.y), player.width, player.height)

  // Bullets
  for (var i in bullets) {
    gamectx.drawImage(tileset, bullets[i].sx, bullets[i].sy, bullets[i].width, bullets[i].height, Math.floor(bullets[i].x), Math.floor(bullets[i].y), bullets[i].width, bullets[i].height)
  }

  renderHud()
  renderGameOver()

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(gamescreen, 0, 0, gamescreen.width, gamescreen.height, 0, 0, canvas.width, canvas.height)
}
