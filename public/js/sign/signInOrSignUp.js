function signInOrSignUp(){

	if($('#nombre').length){//Significa que estamos en Sign Up

		var emailDeRegistro = $('#email').val();
		var passwordDeRegistro = $('#password').val();
		var nombreDeRegistro = $('#nombre').val();
		var telefonoDeRegistro = $('#telefono').val();
		var foto = $('#subirFoto input');

		if(validarSignUp(emailDeRegistro, passwordDeRegistro, nombreDeRegistro, telefonoDeRegistro)){
			firebase.auth().createUserWithEmailAndPassword(emailDeRegistro, passwordDeRegistro).then(function(user){
				// Usuario registrado y logeado con firebase.auth();
				firebase.database().ref('usuarios/' + user.uid).set({nombre: nombreDeRegistro, email: emailDeRegistro, telefono: telefonoDeRegistro}, function(error){
					if(error){
						alert('Tuvimos un problema, favor de volver a intentar');
					}else{
						//Usuario registrado con éxito en firebase.database();
						if(foto[0].files[0] != undefined){//Si seleccionaron foto, hacemos la subida
							var uploadTask = firebase.storage().ref(user.uid + '/foto-normal').put(foto[0].files[0]);

							//Observamos la subida
							uploadTask.on('state_changed', function(snapshot){

							}, function(error) {
								console.log(error);
							}, function(){
								var downloadURL = uploadTask.snapshot.downloadURL;

								firebase.database().ref().child('usuarios/' + user.uid).update({
									fotoPerfilURL: downloadURL
								}, function(error){
									if(error){
										//Hubo un error en la subida de imagen
									}else{
										//Subimos la foto de forma exitosa
										location.href = "index.html";
									}
								});

							});
						}else{//Se ejecuta solo cuando no subimos foto de perfil
							location.href = "index.html";
						}
					}//Fin del else que se ejecuta cuando un usuario se registró con éxito en firebase.database();
				});
			}).catch(function(error){//
			    var errorCode = error.code;
			    var errorMessage = error.message;

			    console.log(error);
			});
		}//Fin de Registro de usuario
	}else{//Inicia el Ingreso de usuario
		var email = $('#email').val();
		var password = $('#password').val();	

		if(validarSignIn(email, password)){
			firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
				//Checa si el usuario es pasajero
				firebase.database().ref('usuarios/' + user.uid).once('value', function(snapshot){
					if(snapshot.val() != null){
						//Generamos código para que solo pueda entrar una persona a la vez con la misma cuenta
						generaCodigoAleatorio(user.uid);
						location.href = "index.html"
					}else{
						//TODO: Generamos notificación
						alert('Un perfil de conductor no puede utilizar la aplicación como un pasajero');//TODO: Quitamos alert por notificación
					}
				});
			}).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				
				// console.log('Código de error : ' + errorCode);
				// console.log('Mensaje de error : ' + errorMessage);
				
				if(errorCode == 'auth/user-not-found'){
					alert('Los datos ingresados no coinciden con ninguna cuenta');
				}

				if(errorCode == 'auth/wrong-password'){
					alert('La contraseña que ingresaste es incorrecta');
				}
			});
		}
	}//Fin de Inicio de usuario
}//Fin de signInOrSignUp()


function validarSignIn(email, password){
	if(validamosCorreo(email) & validamosContrasena(password)){
		return true;
	}else{
		return false;
	}
}

function validarSignUp(email, password, nombre, telefono){
	if(validamosCorreo(email) & validamosContrasena(password) & validamosNombre(nombre) & validamosTelefono(telefono)){
		return true; 
	}else{
		return false;
	}
}

function generaCodigoAleatorio(usuario){
	caracteres = "0123456789abcdefABCDEF?¿¡!:;";
	longitud = 20;

	code = "";
	for (x=0; x < longitud; x++){
		rand = Math.floor(Math.random()*caracteres.length);
		code += caracteres.substr(rand, 1);
	}
	
	firebase.database().ref('usuarios/' + usuario + '/codigoUsuarioActual').set(code);

	localStorage.setItem('codigoSesion', code);

}

