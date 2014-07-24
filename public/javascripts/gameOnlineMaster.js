$(document).ready(function(){
	
	var img = new Image(), 
    	canvas = document.getElementById('canvasSpielfeld');
	img.src = "../images/spielfeld.jpg";

	img.onload = function(){
	    if (canvas.getContext) {
	         var ctx = canvas.getContext('2d');
	         ctx.drawImage(img, 0, 0);
	    }
	};


});