
ENGINE.Maze = {
  generate: function(x,y) {

	var n=x*y-1;
	if (n<0) {/*alert("illegal maze dimensions");*/ return false;}
	var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
	    verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [],
	    here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
	    path = [here],
	    unvisited = [];
	for (var j = 0; j<x+2; j++) {
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++)
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
	}
	while (0<n) {
		var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
		    [here[0]-1, here[1]], [here[0],here[1]-1]];
		var neighbors = [];
		for (var j = 0; j < 4; j++)
			if (unvisited[potential[j][0]+1][potential[j][1]+1])
				neighbors.push(potential[j]);
		if (neighbors.length) {
			n = n-1;
			next= neighbors[Math.floor(Math.random()*neighbors.length)];
			unvisited[next[0]+1][next[1]+1]= false;
			if (next[0] == here[0])
				horiz[next[0]][(next[1]+here[1]-1)/2]= true;
			else 
				verti[(next[0]+here[0]-1)/2][next[1]]= true;
			path.push(here = next);
		} else 
			here = path.pop();
	}

  var entry = [Math.floor(Math.random() * x), y-1];
  var exit = [Math.floor(Math.random() * x), 0];

	return {x: x, y: y, horiz: horiz, verti: verti, entry: entry, exit: exit};
},


image: function(m, currentRoom) {
  /*if(typeof(currentRoom) == "undefined") {
    currentRoom = m.entry[0] + "x" + m.entry[1];
  }*/

  var canvas = document.createElement('canvas');
  canvas.width = m.x*4+1;
  canvas.height = m.y*4+1;
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = app.bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //ctx.fillStyle = app.outlineColor;
  ctx.fillStyle = app.fogColor;

  ctx.fillRect(0,0, canvas.width,1);
  ctx.fillRect(0,0, 1, canvas.height);
  ctx.fillRect(0, canvas.height-1, canvas.width, 1);
  ctx.fillRect(canvas.width-1, 0, 1, canvas.height);

  ctx.fillStyle = app.bgColor;
  // entry
  ctx.fillRect(m.entry[0]*4+1, canvas.height-1, 3, 1);
  // exit
  ctx.fillRect(m.exit[0]*4+1, 0, 3,1);

  //ctx.fillStyle = app.outlineColor;
  ctx.fillStyle = app.fogColor;

  for(var x = 0; x < m.x; x++)
  for(var y = 0; y < m.y; y++) {
    var id = x + "x" + y;

    if(id == currentRoom) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(1+x*4, 1+y*4, 3,3);
      //ctx.fillStyle = app.outlineColor;
      ctx.fillStyle = app.fogColor;
    }


    if(x < m.x-1) {
      // vertical lines
      if(typeof(m.horiz[y][x]) == "undefined") {
        
        ctx.fillRect((x+1)*4,y*4, 1, 5);
      }
    }

    if(y < m.y-1) {
      if(typeof(m.verti[y][x]) == "undefined") {
        
        ctx.fillRect(x*4,(y+1)*4, 5, 1);
      }
    }
    

  }

  return canvas;

},

  room: function(m, x, y) {
    var v = [[0,-1], [0,0], [0,0], [-1,0]];
    var doors = [];

    for(var i in v) {
      var dx = x + v[i][0];
      var dy = y + v[i][1];

      if(dx < 0 || dy < 0) {
        doors[i] = 0;
      }
      else if(i % 2 == 0) {
        doors[i] = m.verti[dy][dx] == true ? 1 : 0;
      }
      else if(i % 2 == 1) {
        doors[i] = m.horiz[dy][dx] == true ? 1 : 0;
      }
    }



    if(m.exit[0] == x && m.exit[1] == y) {
      var isexit = true;
      doors[0] = 1;
    }
    else {
      isexit = false;
    }

    if(m.entry[0] == x && m.entry[1] == y) {
      var isentry = true;
      doors[2] = 1;
    }
    else {
      var isentry = false;
    }


    return {
      doors: doors,
      isentry: isentry,
      isexit: isexit
    };

  }

}