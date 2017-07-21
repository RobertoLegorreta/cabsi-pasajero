$(document).on('ready', function(){

	//Determinamos si está logueado
	determinarLogeado();

	$(document).on('click', '#regresar', function(){
		location.href = "index.html"
	});

	$(document).on('click', '.listItem', function(){
		clickListItem(this);
	});

	$(document).on('click', '#cerrarFlexibleDerecho', function(){
		$('#flexibleDerecho').css('display', 'none');
	});

	$(document).on('click', '#botonGuardar', function(){
		guardarEdicion();
	});

});