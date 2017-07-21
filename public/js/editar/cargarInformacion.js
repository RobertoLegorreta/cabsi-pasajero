function cargarInformacion(){
	var bandera = 0;
	firebase.database().ref('usuarios/' + IDUsuario).on('value', function(data){
		
		if($('#subirFoto').length > 0){//Editar_perfil.html
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
		}
	});
}








