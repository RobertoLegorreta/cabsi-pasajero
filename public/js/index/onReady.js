$(document).on('ready', function(){
	
	//Checamos si usuario está logeado
	determinarLogeado();

	//Visualizamos taxis en pantalla
	buscarTaxis();

	$(document).on('click', '#menu', function(){
		desplegarMenu();
	});

	$(document).on('click', '#oscureceMenu', function(){
		ocultarMenu();
	});

	$(document).on('click', '#editarPerfil', function(){
		menuEditarPerfil();
	});

	$(document).on('click', '#cerrarSesion', function(){
		menuCerrarSesion();
	});

	$(document).on('click', '#eliminarMarcador', function(){
		eliminarMarcador();
	});

	$(document).on('click', '#pedirTaxi', function(){
		pedirTaxi();
	});

	$(document).on('click', '#cerrarPantallaPidiendoTaxi', function(){
		cancelarPeticion();
	});

	//TODO: Programar ventana cuando el taxi ha llegado por mi
	$(document).on('click', '#cerrarPantallaTaxiLlego', function(){
		$('#pantallaTaxiLlego').css('display', 'none');
	});

	$(document).on('click', '#finalizarViaje', function(){
		finalizarViaje();
	});
});