var iosocket = io.connect();

$(document).ready(function(){
	/* Koordiaten aller Positionen auf dem Spielbrett
	 *
	 */
	var posAbs = new Array();    
	posAbs.push(new coordinate(250,550,-1,0));
	posAbs.push(new coordinate(250,500,0,-1));
	posAbs.push(new coordinate(250,450,0,-1));
	posAbs.push(new coordinate(250,400,0,-1));
	posAbs.push(new coordinate(250,350,0,-1));
	posAbs.push(new coordinate(200,350,-1,0));
	posAbs.push(new coordinate(150,350,-1,0));
	posAbs.push(new coordinate(100,350,-1,0));
	posAbs.push(new coordinate(50,350,-1,0));
	posAbs.push(new coordinate(50,300,0,-1));
	posAbs.push(new coordinate(50,250,0,-1));
	posAbs.push(new coordinate(100,250,1,0));
	posAbs.push(new coordinate(150,250,1,0));
	posAbs.push(new coordinate(200,250,1,0));
	posAbs.push(new coordinate(250,250,1,0));
	posAbs.push(new coordinate(250,200,0,-1));
	posAbs.push(new coordinate(250,150,0,-1));
	posAbs.push(new coordinate(250,100,0,-1));
	posAbs.push(new coordinate(250,50,0,-1));
	posAbs.push(new coordinate(300,50,1,0));
	posAbs.push(new coordinate(350,50,1,0));
	posAbs.push(new coordinate(350,100,0,1));
	posAbs.push(new coordinate(350,150,0,1));
	posAbs.push(new coordinate(350,200,0,1));
	posAbs.push(new coordinate(350,250,0,1));
	posAbs.push(new coordinate(400,250,1,0));
	posAbs.push(new coordinate(450,250,1,0));
	posAbs.push(new coordinate(500,250,1,0));
	posAbs.push(new coordinate(550,250,1,0));
	posAbs.push(new coordinate(550,300,0,1));
	posAbs.push(new coordinate(550,350,0,1));
	posAbs.push(new coordinate(500,350,-1,0));
	posAbs.push(new coordinate(450,350,-1,0));
	posAbs.push(new coordinate(400,350,-1,0));
	posAbs.push(new coordinate(350,350,-1,0));
	posAbs.push(new coordinate(350,400,0,1));
	posAbs.push(new coordinate(350,450,0,1));
	posAbs.push(new coordinate(350,500,0,1));
	posAbs.push(new coordinate(350,550,0,1));
	posAbs.push(new coordinate(300,550,-1,0));

	var gameState;
	var tmpPos;
	var posOld;
	var interval;
	var intervalDraw;
	var activePlayer;
	var moveInProgress = false;
	var wurf;
	var endLoop;

	function coordinate(x,y,dx,dy){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
	}

	var coordOld = new coordinate();	//Für die Animation der Bewegung
	var coordNew = new coordinate();

	coordinate.prototype.toString = function(){
		return "[" + this.x + " / " + this.y + "]";
	}

	function init() {
		$("#wuerfel2").attr("disabled", true);
		$.getJSON('/games/gameState', function(data){
			gameState = data;
		});
		ctx = $('#canvasSpielfeld')[0].getContext("2d");
		WIDTH = $("#canvasSpielfeld").width();
		HEIGHT = $("#canvasSpielfeld").height();

	}

	init();
	

	$("#wuerfel2").click(function(){
		var n = Math.floor(Math.random() * 6) + 1;
	    iosocket.emit('dice', n);
	    $(".testFeld").append("<li>" + n + " gewürfelt</li>");
	    $("#wuerfel2").attr("disabled", true);

	});

	iosocket.on('activateDice', function(n) {
		$("#wuerfel2").attr("disabled", false);
	});

	iosocket.on('updateMove', function(n) {
		
		$.getJSON('/games/gameState', function(data){
			gameState = data[0];
			posOld = parseInt(gameState.lastMoveToken[parseInt(gameState.turn)]);
			tmpPos = posOld;
			activePlayer = parseInt(gameState.lastActivePlayer[parseInt(gameState.turn)]);
			wurf = parseInt(gameState.lastDice[parseInt(gameState.turn)]);
			intervalDraw = setInterval(moveTokenTo,600);
			
			$(".testFeld").append("<li> Spieler " + activePlayer + " hat eine " + parseInt(gameState.lastDice[parseInt(gameState.turn)]) + " gewürfelt, und zieht von Position " + posOld + "</li>");
		});
		
	});


	function moveTokenTo(){
		endLoop = false;
		
		tmpPos += 1;
		if (tmpPos == 40){
			
			tmpPos=0;
			coordNew = posAbs[tmpPos];
		}
		else {
			coordNew = posAbs[tmpPos];
		}
		
		if (tmpPos == (posOld + wurf) % 40){
			endLoop = true;
		}
		if(tmpPos==0){
			coordOld = posAbs[39];
		}
		else{
			coordOld = posAbs[tmpPos-1];
		}

		moveInProgress=true;
		interval = setInterval(draw, 10);


		$(".testFeld").append(coordOld.toString());

		if(endLoop){
			gameState.grid[posOld] =-1;
			gameState.grid[tmpPos] = activePlayer;
			gameState.lastMoveToken.push(posOld);
			gameState.turn++;
			clearInterval(intervalDraw);
			if(activePlayer == 0){
				
				$("#wuerfel2").attr("disabled", true);
			}
			if(activePlayer == 1){
				iosocket.emit('activateDice', 0);
			}
			
			//$("#wuerfel2").attr("disabled", false);
		}

	}
	function draw() {
		clear();
		
		var tmpCoord = new coordinate();
		var tmpColor;
		for (var i=0; i<40; i++){
			tmpCoord = posAbs[i];
			if(parseInt(gameState.grid[i]) != activePlayer){
				switch (parseInt(gameState.grid[i])){
					case 0:
						tmpColor = "black";
						drawToken(tmpCoord.x, tmpCoord.y, tmpColor);
						break;
					case 1:
						tmpColor = "orange";
						drawToken(tmpCoord.x, tmpCoord.y, tmpColor);
						break;
					case 2: 
						tmpColor = "green";
						drawToken(tmpCoord.x, tmpCoord.y, tmpColor);
						break;
					case 3:
						tmpColor = "red";
						drawToken(tmpCoord.x, tmpCoord.y, tmpColor);
						break;
				}
			}
			
		}

		// Animation der ziehenden Figur
		
		switch(activePlayer){
			case 0:
				drawToken(coordOld.x, coordOld.y, "black");
				break;
			case 1:
				drawToken(coordOld.x, coordOld.y, "orange");
				break;
			case 2: 
				drawToken(coordOld.x, coordOld.y, "green");
				break;
			case 3:
				drawToken(coordOld.x, coordOld.y, "red");
				break;

		}
		
		coordOld.x += coordNew.dx;
		coordOld.y += coordNew.dy;
		//$(".testFeld").append(coordOld.toString());
		if(coordOld.x == coordNew.x && coordOld.y == coordNew.y){
			moveInProgress = false;
			
			clearInterval(interval);

		}
		
	}

	function drawToken(x,y,color){
		var grd = ctx.createRadialGradient(x, y, 0, x, y, 10);
		grd.addColorStop(0.707, color);
        grd.addColorStop(1.000, 'grey');
		ctx.beginPath();
	    ctx.arc(x, y, 10, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle=grd;
	    ctx.fill();	

	    var grd2 = ctx.createRadialGradient(x, y-14, 0, x, y-14, 8);
        grd2.addColorStop(0.707, color);
        grd2.addColorStop(1.000, 'white');
	    ctx.beginPath();
	    ctx.arc(x, y-14, 8, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle=grd2;
	    ctx.fill();

	}

	function clear(){
		ctx.clearRect(0, 0, WIDTH, HEIGHT);

	}
	
    
});