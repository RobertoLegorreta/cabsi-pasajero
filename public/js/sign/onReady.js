$(document).on('ready', function(){

	//Checamos estado del usuario
	determinarLogeado();

	//Centramos el contenido de registro o ingreso
	centrar();

	$(document).on('keyup',function(evento){
		if(evento.keyCode == 13){
			signInOrSignUp();
	    }
	});

	$(document).on('click', '#sign', function(){
		signInOrSignUp();
	});

	//Altera el html para que pase de ingresar a registrar
	$(document).on('click', '#signUp', function(){
		signUp();
	});

	//Altera el html para que pase de registrar a ingresar
	$(document).on('click', '#signIn', function(){
		signIn();
	});

	$(document).on('change', '#subirFoto input', function(){
		var input = $('#subirFoto input');

		var reader = new FileReader();
        reader.onload = function (e) {
            $('#subirFoto img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input[0].files[0]);

        $('#camara').removeClass('camara');
		$('#camara').addClass('fotoSubidaInput');
	});
});
