$(document).on('ready', function(){

	determinarLogeado();

	$(document).on('click', '#regresar', function(){
		location.href = "index.html"
	});

	$(document).on('click', '.listItem', function(){
		//Limpiamos el placeholder en caso de que se haya escrito algo
		$('#flexibleDerecho input').val('');
		
		//ESTE CÓDIGO SOLO SE EJECUTA CUANDO EL ANCHO ES MENOR A 650
		if($('#flexibleDerecho').css('display') == 'none'){
			$('#flexibleDerecho').css('display', 'block');
		}

		resaltarCampo(this);
		var campo = $(this).find('.tituloItem').text();
		var tipo = $(this).find('.infoItem').attr('id');
		generaCampos(campo, tipo);
	});

	$(document).on('click', '#cerrarFlexibleDerecho', function(){
		$('#flexibleDerecho').css('display', 'none');
	});

	$(document).on('click', '#botonGuardar', function(){
		var entrada = $('#flexibleDerecho input').val();
		var tipo = $('#botonGuardar').attr('tipo');

		if(tipo == 'nombre'){
			//Validamos el nombre
			if(entrada != ''){
				//Subimos dato
				firebase.database().ref('usuarios/' + firebase.auth().currentUser.uid + '/nombre').set(entrada);
  				alert('Nombre cambiado con éxito');
  				$('#flexibleDerecho input').val('');
			}else{
				alert('El nombre ingresado no es un nombre válido');//Cambiar por notificación
			}
		}else if(tipo == 'telefono'){
			//Validamos teléfono
			if(entrada.length == 10){
				//Subimos dato
				firebase.database().ref('usuarios/' + firebase.auth().currentUser.uid + '/telefono').set(entrada);
  				alert('Teléfono cambiado con éxito');
				$('#flexibleDerecho input').val('');
			}else{
				alert('El telefono no es válido');//Cambiar por notificación
			}
		}else if(tipo == 'correo'){
			//Validamos correo
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  			if(re.test(entrada)){
  				//Subimos dato
  				firebase.auth().currentUser.updateEmail(entrada).then(function(){
  					//Tuvimos éxito
					firebase.database().ref('usuarios/' + firebase.auth().currentUser.uid + '/email').set(entrada);
  					alert('Contraseña cambiada con éxito');
					$('#flexibleDerecho input').val('');
  				}, function(error){
  					//Hubo un error
  					alert('Hubo un problema al modificar la contraseña');
  				});
  			}else{
  				alert('El email no es un email válido');//Cambiar por notificación
  			}
		}else if(tipo =='contrasena'){//Tipo es contraseña
			//Validamos contraseña
			if(entrada.length >= 6){
				//Subimos dato
				firebase.auth().currentUser.updatePassword(entrada).then(function() {
					alert('Contraseña modificada con éxito');
					$('#flexibleDerecho input').val('');
				  // Update successful.
				}, function(error) {
					alert('Hubo un problema al modificar la contraseña');
				  // An error happened.
				});
			}else{
				alert('Password muy débil, mínimo 6 caracteres');//Cambiar por notificación
			}
		}
	});

});

		
function resaltarCampo(campo){
	$('.listItem').removeClass('seleccionado');
	$(campo).addClass('seleccionado');
}

function determinarLogeado(){
	firebase.auth().onAuthStateChanged(function(user) {
  	if (user) {
  		cargarInformacion();
 	} else {
	    // User is signed out.
	    location.href = "signup.html"
  	}
});

}

function cargarInformacion(){
	var bandera = 0;
	firebase.database().ref('usuarios/' + firebase.auth().currentUser.uid).on('value', function(data){
		
		if(data.val().fotoPerfilURL != null){
			firebase.storage().refFromURL(data.val().fotoPerfilURL).getDownloadURL().then(function(url){
				$('#camara').attr('src', url);
				$('#camara').removeClass();
				$('#camara').addClass('fotoSubidaInput');
			}).catch(function(error){
				//Hubo un error al cargar la imagen
			});

		}

		$('#nombre').text(data.val().nombre);
		$('#correo').text(data.val().email);
		$('#telefono').text(data.val().telefono);

		if(bandera == 0){//Entra solo 1 vez
			if($(window).width() > 650){
				resaltarCampo($('.primerItem'));
				var campo = $('.primerItem').find('.tituloItem').text();
				generaCampos(campo, 'nombre');
			}
			bandera++;
		}
		
	});
}








