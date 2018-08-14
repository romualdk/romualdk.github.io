/**
 * SCREEN
 */

var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

var gamescreen = document.createElement('canvas');
var gamectx = gamescreen.getContext("2d");
gamescreen.width = 240;
gamescreen.height = 240;

var smoothing = 0;

gamectx.mozImageSmoothingEnabled = smoothing;
gamectx.msImageSmoothingEnabled = smoothing;
gamectx.webkitImageSmoothingEnabled = smoothing;
gamectx.imageSmoothingEnabled = smoothing;

window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();

function resizeCanvas() {
   
    var hScale = Math.floor(window.innerWidth / gamescreen.width);
    var vScale = Math.floor(window.innerHeight / gamescreen.height);
    var scale = hScale < vScale ? hScale : vScale;
    scale = scale < 1 ? 1 : scale;

    var realWidth = scale * gamescreen.width;
    var realHeight = scale * gamescreen.height;
    var left = Math.floor((window.innerWidth - realWidth) / 2);
    var top = Math.floor((window.innerHeight - realHeight) / 2);

    canvas.style.width = realWidth + "px";
    canvas.style.height = realHeight + "px";
    canvas.style.left = left + "px";
    canvas.style.top = top + "px";

    canvas.width = realWidth;
    canvas.height = realHeight;
}


/**
 * TILESET
 */
var tileset = new Image(128, 128);
    tileset.src = "tileset.png";

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

tileset.onload = function () {
    requestAnimationFrame(frame);
}

/**
 * CONTROLS
 */
var controls = {};

function resetControls() {
    controls.A = false;
    controls.B = false;
    controls.UP = false;
    controls.DOWN = false;
    controls.LEFT = false;
    controls.RIGHT = false;
}

resetControls();


function keyControl(event, value) {
    switch (event.key) {
        case "Enter": controls.A = value; break;
        case "Shift": controls.B = value; break;
        case "Z": controls.A = value; break;
        case "X": controls.B = value; break;
        case "ArrowLeft": controls.LEFT = value; break;
        case "ArrowUp": controls.UP = value; break;
        case "ArrowRight": controls.RIGHT = value; break;
        case "ArrowDown": controls.DOWN = value; break;
    }
}

window.addEventListener("keydown", function (event) { keyControl(event, true); }, false);
window.addEventListener("keyup", function (event) { keyControl(event, null); }, false);


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




/**
 * GAME LOGIC
 */
var angle = 0;
var scale = 1;
var speed = 45;


function update(dt) {
    if(controls.UP) {
        speed += 5;
        resetControls();
        
    }
    else if(controls.DOWN) {
        speed -= 5;
        resetControls();
    }

    if(controls.A && speed != 0) {
        speed = 0;
    }
    else if(controls.A && speed == 0) {
        speed = 45;
    }


    angle += speed*dt;

    if(angle >= 360) {
        angle -= 360;
    }

    scale = 2 + 1*Math.sin(Math.PI / 180 *2*angle);
    
}

function render(dt) {
    gamectx.save();
    gamectx.clearRect(0, 0, gamescreen.width, gamescreen.height);
    gamectx.translate(tileset.width, tileset.height);
    gamectx.rotate(Math.PI / 180 * angle); 
    gamectx.drawImage(tileset, 0, 0, tileset.width, tileset.height,  -tileset.width * scale / 2, -tileset.height * scale / 2, tileset.width * scale, tileset.height * scale);
    gamectx.restore();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gamescreen, 0, 0, gamescreen.width, gamescreen.height, 0,0, canvas.width, canvas.height);
    
}
