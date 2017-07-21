function finalizarViaje(){
	$('#conductor').css('display', 'none');
	$('#pedirTaxi').css('display', 'block');
	$('#cerrarPedirTaxi').css('display', 'block');

	firebase.database().ref('usuarios/' + IDUsuario + '/conductorAsignado').set(null);
}