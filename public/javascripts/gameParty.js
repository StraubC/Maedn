//gameParty
$(document).ready(function(){
	
	$('#createParty').click(function(){

	    $("#createBox").show(500);
	    $("#joinBox").hide(500);
	});

	$('#joinParty').click(function(){

	    $("#createBox").hide(500);
	    $("#joinBox").show(500);
	});

});

