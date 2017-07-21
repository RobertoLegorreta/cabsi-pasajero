function desplegarMenu(){
	$('#oscureceMenu').css('display', 'block');

	$( "#oscureceMenu" ).animate({
	    opacity: 1
	}, 300, function() {
	    // Animation complete.
	});

	$( "#barraMenu" ).animate({
	    left: 0
	}, 150, function() {
	    // Animation complete.
	});
}

function ocultarMenu(){
	$( "#oscureceMenu" ).animate({
	    opacity: 0
	}, 300, function() {
		$('#oscureceMenu').css('display', 'none');
	});

	$( "#barraMenu" ).animate({
	    left: -300+'px'
	}, 150, function() {
	    // Animation complete.
	});
}

function menuEditarPerfil(){
	location.href = "editar_perfil.html"
}

function menuCerrarSesion(){
	firebase.auth().signOut().then(function() {
		location.href ="signup.html"
	}, function(error) {
		//TODO: Generar notificación
	  	alert('Hubo un error al cerrar la sesión');//TODO: Cambiar alert por notificación
	});
}