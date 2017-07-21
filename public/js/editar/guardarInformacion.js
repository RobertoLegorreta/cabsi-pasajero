function guardarEdicion(){

	//Agarramos el valor introducido por el usuario
	var entrada = $('#flexibleDerecho input').val();

	//Determinamos el tipo de valor a guardar, jalándolo del atributo tipo del botón
	var tipo = $('#botonGuardar').attr('tipo');

	validamos(entrada, tipo);
}

function validamos(entrada, tipo){
	if(tipo == 'nombre'){
		if(validamosNombre(entrada)){
			guardarEnDatabase(entrada, tipo);
		}
	}else if(tipo == 'telefono'){
		if(validamosTelefono(entrada)){
			guardarEnDatabase(entrada, tipo);
		}
	}else if(tipo == 'correo'){
		if(validamosCorreo(entrada)){
			firebase.auth().currentUser.updateEmail(entrada).then(function(){
				guardarEnDatabase(entrada, 'email');
			}, function(error){
				//TODO: Generamos notificación
				alert('Hubo un problema al modificar la contraseña');//TODO: Quitamos alert por notificación
			});
		}
	}else if(tipo =='contrasena'){
		if(validamosContrasena(entrada)){
			firebase.auth().currentUser.updatePassword(entrada).then(function(){
				notificamosYLimpiamos();
			}, function(error) {
				//TODO: Generamos notificación
				alert('Hubo un problema al modificar la contraseña');//TODO: Quitamos alert por notificación
			});
		}
	}
}//Fin de validamos()

function guardarEnDatabase(entrada, ubicacion){
	firebase.database().ref('usuarios/' + IDUsuario + '/' + ubicacion).set(entrada);
	notificamosYLimpiamos();
}

function notificamosYLimpiamos(){
	alert('Campo modificado con éxito');//TODO: Quitamos alert por notificación
	$('#flexibleDerecho input').val('');
}
