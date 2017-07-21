function mostrarTaxistaAsignado(snapshot){
	if(snapshot.val() != null){

		//Limpiamos el contador, para no borrarle al conductor la petición de forma automática
		clearTimeout(contador);

		$('#conductor').css('display', 'block');
		$('#pantallaPidiendoTaxi').css('display', 'none');
		$('#cerrarPedirTaxi').css('display', 'none');

		firebase.database().ref('choferes/' + snapshot.val()).once('value', function(data){
			$('#nombreConductor').text(data.val().nombre);
			$('#vehiculo').text(data.val().vehiculo.modelo);
			$('#numeroTaxi').text(data.val().vehiculo.numeroTaxi);
			$('#placa').text(data.val().vehiculo.numeroPlaca);
		});
	}else{
		if($('#conductor').css('display') == 'block'){
			$('#conductor').css('display', 'none');
			$('#pedirTaxi').css('display', 'block');
			$('#cerrarPedirTaxi').css('display', 'block');
		}
	}
}