function clickListItem(valor){
	//Limpiamos el placeholder en caso de que se haya escrito algo
	$('#flexibleDerecho input').val('');
	
	//Ocultamos el #flexibleDerecho cuando la pantalla sea muy chica (menor a 650px)
	if($('#flexibleDerecho').css('display') == 'none'){
		$('#flexibleDerecho').css('display', 'block');
	}

	resaltarCampo(valor);
	var campo = $(valor).find('.tituloItem').text();
	var tipo = $(valor).find('.infoItem').attr('id');
	generaCampos(campo, tipo);
}//Fin de clickListItem()

function resaltarCampo(campo){
	$('.listItem').removeClass('seleccionado');
	$(campo).addClass('seleccionado');
}//Fin de resaltarCampo()

var banderaGeneraCampos = 0;
function generaCampos(campo, tipo){

	//Genera el input y botón de #flexibleDerecho solo la primera vez que se da click a un list Item
	if(banderaGeneraCampos == 0){
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('placeholder', campo);
		$('#flexibleDerecho').append(input);

		var boton = document.createElement('p');
		boton.setAttribute('id', 'botonGuardar');
		boton.setAttribute('tipo', tipo);
		var textoBoton = document.createTextNode('ACTUALIZAR ' + campo.toUpperCase());
		boton.appendChild(textoBoton);
		$('#flexibleDerecho').append(boton);

		banderaGeneraCampos++;
	}else{
		$('#flexibleDerecho').find('input').attr('placeholder', campo);
		$('#flexibleDerecho').find('p').text('ACTUALIZAR ' + campo.toUpperCase());
		$('#flexibleDerecho').find('p').attr('tipo', tipo);
	}
}//Fin de generaCampos()