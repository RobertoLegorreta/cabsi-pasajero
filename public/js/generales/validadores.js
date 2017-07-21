function validamosNombre(entrada){
	if(entrada != ''){
		return true;
	}else{
		//TODO: Generamos notificación
		alert('El nombre es obligatorio');//TODO: Quitar alert por notificación
		return false;
	}
}

function validamosTelefono(entrada){
	if(entrada.length == 10){
		return true;
	}else{
		//TODO: Generamos notificación
		alert('El teléfono debe ser de 10 dígitos');//TODO: Quitar alert por notificación
		return false;
	}
}

function validamosCorreo(entrada){
	//Var re establece el estandar del correo
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(re.test(entrada)){
		return true;
	}else{
		//TODO: Generamos notificación
		alert('Favor de ingresar un email válido');//TODO: Quitar alert por notificación
		return false;
	}
}

function validamosContrasena(entrada){
	if(entrada.length >= 6){
		return true;
	}else{
		//TODO: Generamos notificación
		alert('La contraseña mínimo debe contener 6 caracteres');//TODO: Quitar alert por notificación		
		return false;
	}
}
