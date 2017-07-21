$(window).on('resize', function(){
	centrar();
});

function centrar(){
	$('#centrado').css('margin-top', $('#centrado').height()/2*-1);
}