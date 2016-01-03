var iosocket = io.connect();

$(document).ready(function(){
		
	var ctx;	// Canvas Context
	var WIDTH;  //Canvas Breite
	var HEIGHT; //Canvas Höhe

	/* Array aller Spielfiguren auf dem Brett
	 * Positionen: 0 bis 40 Spielfeld, -1 bis -16 Startfelder, 101 bis 116 Zielfelder 
	 */
	var allTokens = new Array(); 
	allTokens[0] = new Object();
	allTokens[0]["farbe"] = "black";
	allTokens[0]["posA"] = 0;
	allTokens[0]["posB"] = -2;
	allTokens[0]["posC"] = -3;
	allTokens[0]["posD"] = -4;

	allTokens[1] = new Object();
	allTokens[1]["farbe"] = "orange";
	allTokens[1]["posA"] = 10;
	allTokens[1]["posB"] = -6;
	allTokens[1]["posC"] = -7;
	allTokens[1]["posD"] = -8;

	allTokens[2] = new Object();
	allTokens[2]["farbe"] = "green";
	allTokens[2]["posA"] = 20;
	allTokens[2]["posB"] = -10;
	allTokens[2]["posC"] = -11;
	allTokens[2]["posD"] = -12;

	allTokens[3] = new Object();
	allTokens[3]["farbe"] = "red";
	allTokens[3]["posA"] = 30;
	allTokens[3]["posB"] = -14;
	allTokens[3]["posC"] = -15;
	allTokens[3]["posD"] = -16;

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

	/* Koordinaten der Startpunkte
	 * 1-4 schwarz 5-8 geld 9-12 gruen 13-16 rot
	 */ 
	var posHome = new Array();	
	posHome.push(new coordinate(0,0,0,0));
	posHome.push(new coordinate(50,550,0,0));
	posHome.push(new coordinate(100,550,0,0));
	posHome.push(new coordinate(50,500,0,0));
	posHome.push(new coordinate(100,500,0,0));
	posHome.push(new coordinate(50,100,0,0));
	posHome.push(new coordinate(100,100,0,0));
	posHome.push(new coordinate(50,50,0,0));
	posHome.push(new coordinate(100,50,0,0));
	posHome.push(new coordinate(500,100,0,0));
	posHome.push(new coordinate(550,100,0,0));
	posHome.push(new coordinate(500,50,0,0));
	posHome.push(new coordinate(550,50,0,0));
	posHome.push(new coordinate(500,550,0,0));
	posHome.push(new coordinate(550,550,0,0));
	posHome.push(new coordinate(500,500,0,0));
	posHome.push(new coordinate(550,500,0,0));

	/* Koordinaten der Zielpunkte
	 * 1-4 schwarz 5-8 geld 9-12 gruen 13-16 rot
	 */
	var posFinish = new Array();
	posFinish.push(new coordinate(0,0,0,0));
	posFinish.push(new coordinate(300,500,0,0));
	posFinish.push(new coordinate(300,450,0,0));
	posFinish.push(new coordinate(300,400,0,0));
	posFinish.push(new coordinate(300,350,0,0));
	posFinish.push(new coordinate(100,300,0,0));
	posFinish.push(new coordinate(150,300,0,0));
	posFinish.push(new coordinate(200,300,0,0));
	posFinish.push(new coordinate(250,300,0,0));
	posFinish.push(new coordinate(300,100,0,0));
	posFinish.push(new coordinate(300,150,0,0));
	posFinish.push(new coordinate(300,200,0,0));
	posFinish.push(new coordinate(300,250,0,0));
	posFinish.push(new coordinate(500,300,0,0));
	posFinish.push(new coordinate(450,300,0,0));
	posFinish.push(new coordinate(400,300,0,0));
	posFinish.push(new coordinate(350,300,0,0));

	var gameState = {
	"id" : 0,
	"turn" : 0,
	"running" : false,
	"playersTotal" : 0,
	"playersIn" : 0,
	"playerNext" : 1,
	"grid" : [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
	"gridHome" : [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3],
	"gridFinish" : [0,0,0,0],
	"lastMoveToken" : [-9],
	"lastDice" : [-1],
	"lastActivePlayer" : [-1],
	"tokensActive" : [0,0,0,0] 
	};

	var coordOld = new coordinate();	//Für die Animation der Bewegung
	var coordNew = new coordinate();
	var interval;
	var intervalDraw;
	var moveInProgress = false;

	// var testPosA=0;
	// var posSpieler11=0, posSpieler21=0, posSpieler31=0;
	var tmpPos;
	var posOld;
	var activePlayer = 0;
	var activeToken = 'A';
	var wurf;
	var anzTrys = 0;

	function coordinate(x,y,dx,dy){
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
	}

	coordinate.prototype.toString = function(){
		return "[" + this.x + " / " + this.y + "]";
	}

	function init() {
		ctx = $('#canvasSpielfeld')[0].getContext("2d");
		WIDTH = $("#canvasSpielfeld").width();
		HEIGHT = $("#canvasSpielfeld").height();

		/*
		 * ToDo: Workaround anlegen gameState mit gleicher ID
		 */
		$.ajax({   
			url: '/games/:' + 1,
			type: 'DELETE'
		});
		var tmpCoord = new coordinate();
		var tmpColor;
		for(var i=0;i<16;i++){
			tmpCoord = posHome[i+1];
			switch (gameState.gridHome[i]){
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

		$("#wuerfel").attr("disabled", false);
		$("#wuerfel2").attr("disabled", true);

		gameState.id = 1;
		gameState.turn = 1;
		gameState.playersTotal = 2;
		gameState.playersIn = 2;
		//gameState.grid[0] = 0;
		//gameState.grid[10] = 1;
		gameState.gridHome[0] = -1;
		gameState.gridHome[4] = -1;
		

		$.ajax({
            type: 'POST',
            data: gameState,
            url: '/games/gameState',
            dataType: 'JSON'
        }).done(function( response ) {
            if (response.msg != ''){
				alert('Error: ' + response.msg);
            }
        });

  
	}

	function clear(){
		ctx.clearRect(0, 0, WIDTH, HEIGHT);

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

	function moveTokenTo(){
		var endLoop = false;
		
		if(tmpPos != -1){
			tmpPos += 1;
			if (tmpPos == 40){
				tmpPos=0;
				coordNew = posAbs[tmpPos];
			}
			else {
				coordNew = posAbs[tmpPos];
			}

			if (tmpPos == (posOld + gameState.lastDice[gameState.turn]) % 40){
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
		}
		else {
			
		}

		//$(".testFeld").append(coordOld.toString());

		if(endLoop){
			gameState.grid[posOld] =-1;
			gameState.grid[tmpPos] = activePlayer;
			gameState.lastMoveToken.push(posOld);
			gameState.lastActivePlayer[gameState.turn] = activePlayer;
			gameState.turn++;
			
			if(activePlayer == 0){
				iosocket.emit('activateDice', 1);
			}
			if(activePlayer == 1){
				$("#wuerfel").attr("disabled", false);
			}
			iosocket.emit('activateDice', gameState.turn);
			iosocket.emit('updateMove', gameState.turn);
			//$("#wuerfel2").attr("disabled", false);
			clearInterval(intervalDraw);
		}

	}

	function draw() {
		clear();
		// Anzeigen der inaktiven Figuren
		
		var tmpCoord = new coordinate();
		var tmpColor;
		for (var i=0; i<40; i++){
			tmpCoord = posAbs[i];
			if(gameState.grid[i] != activePlayer){
				switch (gameState.grid[i]){
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

		for(var i=0;i<16;i++){
			tmpCoord = posHome[i+1];
			switch (gameState.gridHome[i]){
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
		if(coordOld.x == coordNew.x && coordOld.y == coordNew.y){
			moveInProgress = false;
			
			clearInterval(interval);

		}
		
	}

	

	init();

	//drawToken(posAbs[0].x, posAbs[0].y);

	$("#wuerfel").click(function(){
		activePlayer = 0;
		var possMoves = [];
		var anzMoves = 0;
		$("#wuerfel").attr("disabled", true);
		wurf = Math.floor(Math.random() * 6) + 1;

		
		for(var i=0; i<=39; i++){
			if (gameState.grid[i] == activePlayer){
				possMoves.push(i);
				/*gameState.lastMoveToken[gameState.turn] = i;	
				posOld = i;
				tmpPos = posOld;*/
			}
		}
		if(possMoves.length == 0){
			possMoves.push(-1);
			anzTrys++;
			$("#wuerfel").attr("disabled", false);
			if(wurf == 6){
				gameState.lastMoveToken[gameState.turn] = -1;	
				posOld = -1;
				tmpPos = posOld;

				gameState.lastDice[gameState.turn] = wurf;

				var newMove = {
					'updateId': gameState.id,
					'updateMove': gameState.lastMoveToken[gameState.turn],
					'updateDice': gameState.lastDice[gameState.turn],
					'updateActive': activePlayer
				};
				$.ajax({   
					url: '/games/gameStateUpdate',
					type: 'POST',
					data: newMove,
					dataType: 'JSON'
				}); 
				
				intervalDraw = setInterval(moveTokenTo,600);
			}
		}

		else{
			anzMoves = possMoves.length;

			switch (anzMoves){
				case 4:
					$("#choose4Box").show(500);
				case 3:
					$("#choose3Box").show(500);
				case 2: 
					$("#choose2Box").show(500);
				case 1:
					$("#choose1Box").show(500);
					break;
			}
		}


		$(".testFeld").append("<li>" + wurf + "</li>");
			
	});

	$("#choose1").click(function(){
		var possMoves = [];
		var anzMoves = 0;
		

		for(var i=0; i<=39; i++){
			if (gameState.grid[i] == activePlayer){
				possMoves.push(i);
				
			}
		}
		if(possMoves.length == 0){
			possMoves.push(-1);
		}
		if(possMoves[0] == -1){
			//keine aktiven Figuren
		}

		else{
			gameState.lastMoveToken[gameState.turn] = possMoves[0];	
			posOld = possMoves[0];
			tmpPos = posOld;
		}
		$(".testFeld").append("<li> 1 gewählt " + possMoves[0] + "</li>");
		gameState.lastDice[gameState.turn] = wurf;

		var newMove = {
			'updateId': gameState.id,
			'updateMove': gameState.lastMoveToken[gameState.turn],
			'updateDice': gameState.lastDice[gameState.turn],
			'updateActive': activePlayer
		};
		$.ajax({   
			url: '/games/gameStateUpdate',
			type: 'POST',
			data: newMove,
			dataType: 'JSON'
		}); 
		
		intervalDraw = setInterval(moveTokenTo,600);

	});

	$("#choose2").click(function(){
		$(".testFeld").append("<li> 2 gewählt</li>");
	});

	$("#choose3").click(function(){
		$(".testFeld").append("<li> 3 gewählt</li>");
	});

	$("#choose4").click(function(){
		$(".testFeld").append("<li> 4 gewählt</li>");
	});
	
	$("#wuerfel2").click(function(){
		activePlayer = 1;
		
		$("#wuerfel2").attr("disabled", true);
		posOld = allTokens[activePlayer]["posA"];
		tmpPos = posOld;

		// posOld = posSpieler21;
		// testPosA = posSpieler21;
		wurf = Math.floor(Math.random() * 5) + 1;
		allTokens[activePlayer]["posA"] = (posOld + wurf) % 40;
		var i;

		intervalDraw = setInterval(moveTokenTo,600);
		
		// for(i=0;i<wurf-1;i++){
		// 	//testPosA+=1;
		// 	//testPosA%=40;
		// 	clear();
		// 	moveTokenTo(testPosA);

		// }
		

		// testPosA+=1;
		// testPosA%=40;
		// clear();
		// moveTokenTo(testPosA);

		$(".testFeld").append("<li>" + wurf + "</li>");
		
		
	});

	iosocket.on('dice', function(n) {
		activePlayer = 1;
		for(var i=0; i<=39; i++){
			if (gameState.grid[i] == activePlayer){
				gameState.lastMoveToken[activePlayer] = i;	
				posOld = i;
				tmpPos = posOld;
			}
		}
		var newMove = {
			'updateId': gameState.id,
			'updateMove': gameState.lastMoveToken[gameState.turn++],
			'updateDice': gameState.lastDice[gameState.turn],
			'updateActive': activePlayer
		};
		$.ajax({   
			url: '/games/gameStateUpdate',
			type: 'POST',
			data: newMove,
			dataType: 'JSON'
		});
		gameState.lastDice[gameState.turn] = n; 
		intervalDraw = setInterval(moveTokenTo,600);
		
   		$('.testFeld').append("<li>" + n + " gewürfelt</li>");
	});

	iosocket.on('activateDice', function(n) {
		$("#wuerfel").attr("disabled", false);
	});
	
});
