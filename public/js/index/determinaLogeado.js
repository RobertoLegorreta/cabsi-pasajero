var IDUsuario;

function determinarLogeado(){
	firebase.auth().onAuthStateChanged(function(user) {
	  	if(user){
		  	IDUsuario = user.uid;

	  		//Ponemos el nombre del usuario en el menú
	  		firebase.database().ref('usuarios/' + IDUsuario).once('value', function(data){
	  			$('#usuario').text(data.val().nombre);
	  		});

	  		//Lleva el registro de los taxistas que han rechazado la solicitud
	  		firebase.database().ref('usuarios/' + IDUsuario + '/peticionEstado').on('value',function(snapshot){
				if(snapshot.val() != null){
					pedirTaxiEnDatabase(snapshot.val());
				}
			});

			//Escucha si un taxista ha aceptado la solicitud
	  		firebase.database().ref('usuarios/' + IDUsuario + '/conductorAsignado').on('value', function(snapshot){
	  			mostrarTaxistaAsignado(snapshot);
	  		});

	  		//Escuchamos los cambios de código para usuarios de la misma cuenta
			firebase.database().ref('usuarios/' + IDUsuario + '/codigoUsuarioActual').on('value', function(codigo){
				if(codigo.val() != null){
					var codigoSesion = localStorage.getItem('codigoSesion');
				
					if(codigo.val() != codigoSesion){
						//Cerrar sesión si se detectó otro inicio
						menuCerrarSesion();
					}
				}
			});


	 	} else {
		    location.href = "signup.html"
	  	}
	});
}