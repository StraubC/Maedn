$(document).ready(function(){
		
	var ctx;	// Canvas Context
	var WIDTH;  //Canvas Breite
	var HEIGHT; //Canvas Höhe


	var posAbs = new Array();    // Koordiaten aller Positionen auf dem Spielbrett
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

	var coordOld = new coordinate();	//Für die Animation der Bewegung
	var coordNew = new coordinate();
	var interval;

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
  
	}

	function clear(){
		ctx.clearRect(0, 0, WIDTH, HEIGHT);

	}

	function drawToken(x,y){
		var grd = ctx.createRadialGradient(x, y, 0, x, y, 10);
        grd.addColorStop(0.707, 'black');
        grd.addColorStop(1.000, 'white');
		ctx.beginPath();
	    ctx.arc(x, y, 10, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle=grd;
	    ctx.fill();	

	    var grd2 = ctx.createRadialGradient(x, y-14, 0, x, y-14, 8);
        grd2.addColorStop(0.707, 'black');
        grd2.addColorStop(1.000, 'white');
	    ctx.beginPath();
	    ctx.arc(x, y-14, 8, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle=grd2;
	    ctx.fill();

	}

	function moveTokenTo(pos){
		if(pos == 0){
			coordOld = posAbs[39];
		}
		else{
			coordOld = posAbs[pos-1];
		}
		coordNew = posAbs[pos]; 
		
		// while(!(coordOld.x == coordNew.x && coordOld.y == coordNew.y)){
		// 	setTimeout(draw(),100);
		// }
		interval = setInterval(draw, 10);


		$(".testFeld").append(coordOld.toString());
	}

	function draw() {
		clear();
		drawToken(coordOld.x,coordOld.y);
		coordOld.x += coordNew.dx;
		coordOld.y += coordNew.dy;
		//$(".testFeld").append(coordOld.toString());
		if(coordOld.x == coordNew.x && coordOld.y == coordNew.y){
			clearInterval(interval);
		}
	}

	var testPosA=35;

	init();

	drawToken(posAbs[0].x, posAbs[0].y);

	$("#wuerfel").click(function(){
		
		testPosA+=1;
		testPosA%=40;
		$(".testFeld").append(testPosA);
		clear();
		moveTokenTo(testPosA);
	});
	

});