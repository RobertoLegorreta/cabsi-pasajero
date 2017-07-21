var marcadorActual; 

function ponerMarcador(e){
	//Impedimos el pedir taxi cuando ya tenemos conductor asignado
	if($('#conductor').css('display') == 'block'){
		impedirNuevaPeticionDeTaxi();
	}else{

		$('#informativa').css('display', 'none');
		$('#pedirTaxi').css('display', 'block');
		$('#eliminarMarcador').css('display', 'block');	

		var pos = e.latLng;

		if(marcadorActual != null){
			marcadorActual.setMap(null);
		}

		var marker = new google.maps.Marker({
	        position: pos,
	        icon: {url: 'objetos/mapa/quieroIr.png', scaledSize: new google.maps.Size(27, 27)},
	        map: map,
	  	});	

		//Contenemos la ubicación a la que el usuario quiere ir
	  	marcadorActual = marker;
	}
}

function impedirNuevaPeticionDeTaxi(){
	$('#informativa').css('display', 'none');
	$('#pedirTaxi').css('display', 'none');
	$('#eliminarMarcador').css('display', 'none');
}

