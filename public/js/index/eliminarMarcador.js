function eliminarMarcador(){
	marcadorActual.setMap(null);
	$('#informativa').css('display', 'block');
	$('#pedirTaxi').css('display', 'none');
	$('#cerrarPedirTaxi').css('display', 'none');
}