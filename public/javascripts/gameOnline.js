$(document).ready(function(){
	
	$('#createOnline').click(function(){

	    $("#createBox").show(500);
	    $("#joinBox").hide(500);
	});

	$('#joinOnline').click(function(){

	    $("#createBox").hide(500);
	    $("#joinBox").show(500);
	});

});

