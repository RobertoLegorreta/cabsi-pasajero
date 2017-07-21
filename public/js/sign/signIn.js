function signIn(){
	$('#sign').attr('value','INICIAR SESIÓN');
	$('#nombre').remove();
	$('#subirFoto').remove();
	$('#telefono').remove();

	//Cambiar texto a #anotacion
	$('#anotacion').text("¿No tienes una cuenta? ");
	var span = document.createElement('span');
	span.setAttribute('id', 'signUp');
	$('#anotacion').append(span);
	var textoSpan = document.createTextNode('Regístrate');
	span.appendChild(textoSpan);

	centrar();
}
