/**
 * SCREEN
 */
var canvas = document.querySelector('#screen');
var ctx = canvas.getContext('2d');
var screen = {
    width: 240,
    height: 240
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

console.log(isMobile());




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


    angle += speed*dt;

    if(angle >= 360) {
        angle -= 360;
    }

    scale = 2 + 1*Math.sin(Math.PI / 180 *2*angle);
    
}

function render(dt) {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(tileset.width, tileset.height);
    ctx.rotate(Math.PI / 180 * angle); 
    ctx.drawImage(tileset, 0, 0, tileset.width, tileset.height,  -tileset.width * scale / 2, -tileset.height * scale / 2, tileset.width * scale, tileset.height * scale);
    ctx.restore();
}
