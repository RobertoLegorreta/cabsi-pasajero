function signUp(){
	$('#sign').attr('value','REGISTRAR');

	//Crear input #telefono
	var telefono = document.createElement('input');
	telefono.setAttribute('id', 'telefono');
	telefono.setAttribute('type', 'tel');
	telefono.setAttribute('placeholder', 'Teléfono');
	$('#centrado').prepend(telefono);

	//Crear input #nombre
	var nombre = document.createElement('input');
	nombre.setAttribute('id', 'nombre');
	nombre.setAttribute('type', 'text');
	nombre.setAttribute('placeholder', 'Nombre');
	$('#centrado').prepend(nombre);

	//Crear input file
	var subirFoto = document.createElement('figure');
	subirFoto.setAttribute('id', 'subirFoto');
	var imagen = document.createElement('img');
	imagen.setAttribute('id', 'camara');
	imagen.setAttribute('class', 'camara');
	imagen.setAttribute('src', 'objetos/sign/camara.png');
	subirFoto.appendChild(imagen);
	var input = document.createElement('input');
	input.setAttribute('type', 'file');
	subirFoto.appendChild(input);
	$('#centrado').prepend(subirFoto);

	//Cambiar texto a #anotacion
	$('#anotacion').text('¿Ya tienes una cuenta? ');
	var span = document.createElement('span');
	span.setAttribute('id', 'signIn');
	$('#anotacion').append(span);
	var textoSpan = document.createTextNode('Inicia sesión');
	span.appendChild(textoSpan);

	centrar();
}





