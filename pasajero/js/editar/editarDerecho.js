var bandera = 0;

function generaCampos(campo, tipo){

	if(bandera == 0){
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('placeholder', campo); //CAMBIA DEPENDIENDO DEL CAMPO SELECCIONADO
		$('#flexibleDerecho').append(input);

		var boton = document.createElement('p');
		boton.setAttribute('id', 'botonGuardar');
		boton.setAttribute('tipo', tipo);
		var textoBoton = document.createTextNode('ACTUALIZAR ' + campo.toUpperCase());//CAMBIA DEPENDIENDO DEL CAMPO SELECCIONADO
		boton.appendChild(textoBoton);
		$('#flexibleDerecho').append(boton);

		bandera++;
	}else{
		$('#flexibleDerecho').find('input').attr('placeholder', campo);
		$('#flexibleDerecho').find('p').text('ACTUALIZAR ' + campo.toUpperCase());
		$('#flexibleDerecho').find('p').attr('tipo', tipo);
	}

}