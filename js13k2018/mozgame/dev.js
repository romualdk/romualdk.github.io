
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

var sound = {};

function initSound() {
    for(var i in audioSrc) {
        sound[i] = document.createElement("AUDIO");
        sound[i].src = audioSrc[i];
    }
}

initSound();


/**
 * SCREEN
 */

var gamescreen = document.createElement('canvas');
var gamectx = gamescreen.getContext("2d");
gamescreen.width = 420;
gamescreen.height = 180;

var scale = 1;

var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');
    canvas.width = gamescreen.width * scale;
    canvas.height = gamescreen.height * scale;

var smoothing = 0;

gamectx.mozImageSmoothingEnabled = smoothing;
gamectx.msImageSmoothingEnabled = smoothing;
gamectx.webkitImageSmoothingEnabled = smoothing;
gamectx.imageSmoothingEnabled = smoothing;

window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();

function resizeCanvas() {
    scale = Math.floor(window.innerWidth / gamescreen.width);
    scale = scale < 1 ? 1 : (scale > 2 ? 2 : scale);

    canvas.width = gamescreen.width * scale;
    canvas.height = gamescreen.height * scale;
}


/**
 * Color tables
 */
var colorScheme = {};

colorScheme.standard = {
    colors: [
        [  0,  0,  0], // black - outline
        [255,156, 18], // orange - tone
        [255,255,255], // white - highlight,
        [250,188, 32], // yellow - ground,
        [196, 98,  0], // brown - ground marks
        [ 66,154,215], // blue - sky,
        [127,213,205], // light-blue - sky anti-aliasing
        [247,247,247], // gray - clouds
        [ 53,128,  0], // green - plants / animals
        [255, 41, 80]  // red - enemies
    ],
    groundColor: 3,
    skyColor: 5,
    cloudColor: 7,
    colorMap:{
        0: 0,
        127: 1,
        255: 2
    },
    palettes: [
        [0,1,2], // sprites
        [5,6,7], // sky / clouds
        [0,3,4], // ground
        [0,4,1], // rocks
        [0,8,3], // plants
        [0,8,2], // animals
        [0,9,3]  // read enemies
    ],
    // Palette index for each 32x32 px block on tileset
    palleteMap: [
        0,0,0,0,
        0,0,0,0,
        3,3,4,0,
        5,6,0,0,
        1,1,1,2
    ]
}


colorScheme.grayscale = {
    colors: [
        [  0,  0,  0], // black
        [160,160,160], // gray
        [247,247,247], // white
    ],
    groundColor: 1,
    skyColor: 2,
    cloudColor: 2,
    colorMap:{
        0: 0,
        127: 1,
        255: 2
    },
    palettes: [
        [0,1,2], // sprites
        [2,2,2], // sky / clouds
        [0,1,0], // ground
    ],
    // Palette index for each 32x32 px block on tileset
    palleteMap: [
        0,0,0,0,
        0,0,0,0,
        0,0,0,0,
        0,0,0,0,
        1,1,1,2
    ]
}

var currentColorScheme = 'standard';

/**
 * TILESET
 */
var chrtable = new Image();
    chrtable.src = "data:image/png;base64,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";


var tileset = document.getElementById('tileset'); //document.createElement('canvas');
var tilesetCtx = tileset.getContext("2d");
    tileset.width = 128;
    tileset.height = 256;


function colorizeTileset() {
    tilesetCtx.drawImage(chrtable, 0,0);
    var imageData = tilesetCtx.getImageData(0,0, 128,256);
    var data = imageData.data;

    var scheme = colorScheme[currentColorScheme];

    for(var y = 0; y < 256; y++)
    for(var x = 0; x < 128; x++) {
        var index = (y * 128 + x) * 4;
        var colorIndex = scheme.colorMap[data[index]];
        var palMap = Math.floor(y / 32) * 4 + Math.floor(x / 32);
        var pal = scheme.palleteMap[palMap] ? scheme.palleteMap[palMap] : 0;
        var color = scheme.colors[scheme.palettes[pal][colorIndex]];
  
        data[index] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
    }

    tilesetCtx.putImageData(imageData, 0,0);
}


function getTilePos(tile) {
    return [
        (tile % 8) * 16,
        Math.floor(tile / 8) * 16
    ];
}


/**
 * Layers
 */

var ground = document.getElementById('ground');
    groundCtx = ground.getContext('2d');

function initGround() {
    ground.width = Math.ceil(gamescreen.width / 80) * 80;
    ground.height = Math.floor(gamescreen.height / 4);

    var scheme = colorScheme[currentColorScheme];
    var color = scheme.colors[scheme.groundColor];

    groundCtx.fillStyle="rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
    groundCtx.fillRect(0,0, ground.width, ground.height);

    var stamps = Math.floor(5 + Math.random() * 3);
    var pos = getTilePos(70);

    var step = Math.floor(ground.width / stamps);
    var devStep = Math.floor(step / 3);
    var devVert = Math.floor(ground.height / 8);

    for(var i = 0; i < stamps; i++) {
        var dx = 16 + i*step + devStep - Math.floor(Math.random()*devStep*2);
        var dy = Math.floor(ground.height / 3) + devVert - Math.floor(Math.random()*devVert*2);
        groundCtx.drawImage(tileset, pos[0],pos[1], 32,32, dx, dy, 32,32);
    }
}

var sky = document.getElementById('sky');
    skyCtx = sky.getContext('2d');

function initSky() {
    sky.width = ground.width;
    sky.height = gamescreen.height - ground.height;
    var thirdHeight = Math.floor(sky.height / 3);
    
    var scheme = colorScheme[currentColorScheme];
    var color = scheme.colors[scheme.skyColor];

    skyCtx.fillStyle="rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
    skyCtx.fillRect(0,0, sky.width, sky.height - thirdHeight);

    var color = scheme.colors[scheme.cloudColor];

    skyCtx.fillStyle="rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
    skyCtx.fillRect(0,sky.height - thirdHeight, sky.width, thirdHeight);

    var pos = getTilePos(64);

    for(var i = 0; i < sky.width / 80; i++) {
        var dx = i * 80;
        var dy = sky.height - thirdHeight - 32;

        skyCtx.drawImage(tileset, pos[0],pos[1],80,32, dx,dy, 80,32);
    }
}


/**
 * GAME LOOP
 */
var now,
    dt       = 0,
    last     = timestamp(),
    slow     = 1,
    step     = 1/60,
    slowStep = slow * step;

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

function frame() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);

    while(dt > slowStep) {
        dt = dt - slowStep;
        update(step);
    }

    render(dt/slow);

    last = now;

    requestAnimationFrame(frame);
}


/**
 * MISC
 */
function isMobile() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
     }
   }


var spritesheet = {
    player: {
        width: 32,
        height: 32,
        /*tiles: [
            0, // stand
            2, // walk 1
            4, // walk 2
            6, // dodge,
            8, // jump
            10, // look up
            12, // look back
            14 // hurt
        ],*/
        animations: {
            stand: [0],
            walk: [0,2,0,4],
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
function Sprite(sprite) {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.jumping = false;
    this.width = spritesheet[sprite].width;
    this.height = spritesheet[sprite].height;
    this.animations = {};
    this.animationSpeed = spritesheet[sprite].animationSpeed;
    this.currentAnimation = spritesheet[sprite].currentAnimation;
    this.currentAnimationTile = 0;

    for(var a in spritesheet[sprite].animations) {
        this.animations[a] = [];

        for(var i in spritesheet[sprite].animations[a]) {
            this.animations[a][i] = getTilePos(spritesheet[sprite].animations[a][i]);
        }
    }
}

Sprite.prototype.update = function(dt) {
    this.currentAnimationTile = (this.currentAnimationTile + this.animationSpeed * dt) % this.animations[this.currentAnimation].length;

    var ay = this.ay + (gravity * 100);

    this.vx += this.ax * dt;
    this.vy += ay * dt;

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if(this.y + this.height > spriteGroundY) {
        this.y = spriteGroundY - this.height;
    }

    this.jumping = this.y + this.height < spriteGroundY;

    if(this.jumping) {
        this.setCurrentAnimation('jump');
    }
    else {
        this.setCurrentAnimation('walk');
    }
}

Sprite.prototype.setCurrentAnimation = function(animation) {
    if(animation !== this.currentAnimation) {
        this.currentAnimation = animation;
        this.currentAnimationTile = 0;
    }
}

Sprite.prototype.getCurrentTile = function() {
    return this.animations[this.currentAnimation][Math.floor(this.currentAnimationTile)];
}


/**
 * PLAYER
 */
var player = new Sprite('player');

function initPlayer() {
    spriteGroundY = gamescreen.height - ground.height + 4;
    player.x = 16;
    player.y = spriteGroundY - player.height;
    player.currentAnimation = 'walk';

    
}

player.jump = function() {
    this.vy = -300;
    sound.jump.play();
}

player.shoot = function() {
    if(bullets.length < 20) {
        addBullet(this.x + 32, this.y + 18);

        sound.shoot.play();
    }
    
}

/**
 * BULLETS
 */
var bullets = [];

function Bullet (id, x, y) {
    var tilePos = getTilePos(38);
    
    this.id = id;
    this.x = x;
    this.y = y;
    this.sx = tilePos[0];
    this.sy = tilePos[1];
    this.width = 5;
    this.height = 5;

    this.vx = 250;
}

Bullet.prototype.update = function(dt) {
    this.x += this.vx * dt;

    if(this.x > gamescreen.width) {
        removeBullet(this.id);
    }
}

function addBullet(x, y) {
    var id = bullets.length;
    bullets[id] = new Bullet(id, x,y);
    bullets[id].vx += Math.floor(10 - Math.random()*20);
}

function removeBullet(id) {
    bullets.splice(id, 1)

    for(var i in bullets) {
        bullets[i].id = i;
    }
}


/**
 * OBSTACLES
 */
var obstacleTiles = [34,35,36,37,40,41,42,44,45];
var obstacles = [];
var obstacleTimer = 0;
var obstacleWait = 3;

function Obstacle(id, x, y) {
    var tile = obstacleTiles[Math.floor(Math.random() * obstacleTiles.length)];

    var tilePos = getTilePos(tile);
    
    this.id = id;
    this.x = x;
    this.y = y - 14;
    this.sx = tilePos[0];
    this.sy = tilePos[1];
    this.width = 16;
    this.height = 16;

    this.vx = -groundSpeed;
}

Obstacle.prototype.update = function(dt) {
    //this.x -= this.vx * dt;
    this.x += groundSpeed * dt;

    if(this.x < -this.width) {
        removeObstacle(this.id);
    }
}

function addObstacle(x, y) {
    var id = obstacles.length;
    obstacles[id] = new Obstacle(id, x + Math.floor(Math.random()*50),y);
}

function removeObstacle(id) {
    obstacles.splice(id, 1)

    for(var i in obstacles) {
        obstacles[i].id = i;
    }
}


/**
 * CONTROLS
 */
document.addEventListener('touchstart', function(event) {
    if(!isDead) {
        // left half of the window click
        if(event.pagetX < window.innerWidth / 2 && !player.jumping) {
            player.jump();
        }
        // right half of the window click
        else if(event.pageX > window.innerWidth / 2) {
            player.shoot();
        }
    }
    else {
        resetGame();
        sound.powerup.play();
    }
});

document.addEventListener('click', function(event) {
    if(!isDead) {
        // left half of the window click
        if(event.clientX < window.innerWidth / 2 && !player.jumping) {
            player.jump();
        }
        // right half of the window click
        else if(event.clientX > window.innerWidth / 2) {
            player.shoot();
        }
    }
    else {
        resetGame();
        sound.powerup.play();
    }
});

document.addEventListener('keypress', function(event) {
    if(!isDead) {
        // Z - jump
        if(event.key == 'z' && !player.jumping) {
            player.jump();
        }

        // X - shoot
        if(event.key == 'x') {
            player.shoot();
        }

        // C - switch color
        if(event.key == 'c' && currentColorScheme == 'standard') {
            currentColorScheme = 'grayscale';
            colorizeTileset();
            initGround();
            initSky();
        }
        else if(event.key == 'c' && currentColorScheme == 'grayscale') {
            currentColorScheme = 'standard';
            colorizeTileset();
            initGround();
            initSky();
        }
    }
    else {
        if(event.key == 'z' || event.key == 'x') {
            resetGame();
            sound.powerup.play();
        }
    }
    
});



/**
 * GAME LOGIC
 */
var gravity = 9.8;
var groundPos = 0;
var groundSpeed = -350;
var spriteGroundY;

var skyPos = 0;
var skySpeed = Math.floor(groundSpeed / 10);

var isDead = false;
var speedTimer = 0;
var speedWait = 10;


chrtable.onload = function() {
    colorizeTileset();
    initGround();
    initSky();
    //initPlayer();

    resetGame();

    isDead = true;

    requestAnimationFrame(frame);
}

function resetGame() {
    bullets = [];
    obstacles = [];
    groundSpeed = -150;
    skySpeed = -15;
    initPlayer();
    isDead = false;
}


function update(dt) {
    for(var i in bullets) {
        bullets[i].update(dt);
    }
    
    if(isDead) {
        return false;
    }


    speedTimer += dt;
    obstacleTimer += dt;

    if(speedTimer >= speedWait) {
        groundSpeed -= 50;
        skySpeed = Math.floor(groundSpeed / 10);

        sound.powerup.play();

        speedTimer = 0;
    }

    if(obstacleTimer >= obstacleWait) {
        addObstacle(gamescreen.width + 16, spriteGroundY);
        obstacleTimer = 0;
    }

    for(var i in obstacles) {
        obstacles[i].update(dt);
    }

    groundPos += groundSpeed * dt;
    if(groundPos < 0) {
        groundPos += ground.width;
    }

   skyPos += skySpeed * dt;
   if(skyPos < 0) {
        skyPos += sky.width;
    }

    player.update(dt);

    

    // Collision detection
    var collision = false;
    var i = 0;
    while(!collision && i < obstacles.length) {
        // broead phase
        if(obstacles[i].x < 64) {

            // narrow phase
            var a = (obstacles[i].x + 8) - (player.x + 16);
            var b = (obstacles[i].y + 8) - (player.y+ 16);
            var distance = Math.sqrt( a*a + b*b )

            if(distance <= 16) {
                collision = true;
                isDead = true;

                player.setCurrentAnimation('hurt');
                sound.hurt.play();
            }
        }

        i++;
    }
}

function render(dt) {
    gamectx.clearRect(0, 0, gamescreen.width, gamescreen.height);

    // Ground
    gamectx.drawImage(ground, Math.floor(groundPos),gamescreen.height - ground.height);
    gamectx.drawImage(ground, 0,0, ground.width,ground.height, Math.floor(groundPos - ground.width),gamescreen.height - ground.height, ground.width,ground.height);

    // Sky
    gamectx.drawImage(sky, Math.floor(skyPos),0);
    gamectx.drawImage(sky, 0,0, sky.width,sky.height, Math.floor(skyPos - sky.width),0, sky.width,sky.height);

    // Obstacles
    for(var i in obstacles) {
        gamectx.drawImage(tileset, obstacles[i].sx,obstacles[i].sy, obstacles[i].width,obstacles[i].height, Math.floor(obstacles[i].x),Math.floor(obstacles[i].y), obstacles[i].width,obstacles[i].height);
    }

    // Player
    var tile = player.getCurrentTile();
    gamectx.drawImage(tileset, tile[0],tile[1], player.width,player.height, Math.floor(player.x),Math.floor(player.y), player.width,player.height);

    // Bullets
    for(var i in bullets) {
        gamectx.drawImage(tileset, bullets[i].sx,bullets[i].sy, bullets[i].width,bullets[i].height, Math.floor(bullets[i].x),Math.floor(bullets[i].y), bullets[i].width,bullets[i].height);
    }
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gamescreen, 0, 0, gamescreen.width, gamescreen.height, 0,0, canvas.width, canvas.height);
}
