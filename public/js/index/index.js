$(document).on('ready', function(){

	determinarLogeado();

	var taxistas = [];
	var buscarTaxis = setInterval(function(){
		firebase.database().ref('ubicacionTaxi').once('value', function(taxis){
			
			for(var i = 0; i < taxistas.length; i++){
				taxistas[i].setMap(null);
			}	
						
			if(taxis.val() != null){
				var bandera = 0;
				$.each( taxis.val(), function( key, value ){
				  	var marcador = new google.maps.Marker({
			            position: {lat: value.lat, lng: value.lng },
			            icon: {url: 'objetos/mapa/taxi.png', scaledSize: new google.maps.Size(35, 35)},
			            map: map,
		      		});
		      		taxistas[bandera] = marcador;
		     		bandera++;
				});
			}	
			

		});
	}, 4000);


	$(document).on('click', '#menu', function(){
		$('#oscureceMenu').css('display', 'block');

		$( "#oscureceMenu" ).animate({
		    opacity: 1
		}, 300, function() {
		    // Animation complete.
		});

		$( "#barraMenu" ).animate({
		    left: 0
		}, 150, function() {
		    // Animation complete.
		});
	});

	$(document).on('click', '#oscureceMenu', function(){
		$( "#oscureceMenu" ).animate({
		    opacity: 0
		}, 300, function() {
			$('#oscureceMenu').css('display', 'none');
		});

		$( "#barraMenu" ).animate({
		    left: -300+'px'
		}, 150, function() {
		    // Animation complete.
		});
	});

	$(document).on('click', '#cerrarSesion', function(){
		firebase.auth().signOut().then(function() {
			location.href ="signup.html"
		}, function(error) {
		  // An error happened.8
		  alert('Hubo un error al cerrar la sesión');
		});		
	});


	$(document).on('click', '#cerrarPedirTaxi', function(){
		marcadorActual.setMap(null);
		$('#informativa').css('display', 'block');
		$('#pedirTaxi').css('display', 'none');
		$('#cerrarPedirTaxi').css('display', 'none');
	});

	//Esto es temporal
	$(document).on('click', '#pedirTaxi', function(){
		$('#pantallaPidiendoTaxi').css('display', 'block');
		$('#pedirTaxi').css('display', 'none');

		// var lat = marcadorActual.position.lat();
		// var lng = marcadorActual.position.lng();
		var usuario = firebase.auth().currentUser.uid;

		var peticion = {
			userKey: usuario,
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			ubicacionQuieroIr: {lat: marcadorActual.position.lat(), lng: marcadorActual.position.lng()},
			miUbicacion: {lat: miUbicacion.position.lat(), lng: miUbicacion.position.lng()}
		}

		var keyPeticion = firebase.database().ref('peticiones/').push().key;

		var actualizar = {};
		actualizar['peticiones/' + keyPeticion] = peticion;
		actualizar['usuarios/' + usuario + '/peticiones/' + keyPeticion] = true;

		firebase.database().ref().update(actualizar);
	

	});
	//Esto es temporal

	$(document).on('click', '#cerrarPantallaPidiendoTaxi', function(){
		$('#pantallaPidiendoTaxi').css('display', 'none');
		$('#pedirTaxi').css('display', 'block');

		var usuario = firebase.auth().currentUser.uid;

		firebase.database().ref('usuarios/' + usuario + '/peticiones').once('value', function(data){
		
			var actualizar = {};			

			for(peticion in data.val()){
				actualizar['peticiones/' + peticion] = null;
				actualizar['usuarios/' + usuario + '/peticiones/' + peticion] = null;
			}

			firebase.database().ref().update(actualizar);

		});
	});

	//Esto es temporal
	$(document).on('click', '#textoPidiendoTaxi', function(){
		$('#conductor').css('display', 'block');
		$('#pantallaPidiendoTaxi').css('display', 'none');
		$('#cerrarPedirTaxi').css('display', 'none');
	});
	//Esto es temporal

	//Esto es temporal
	$(document).on('click', '#fotoConductor', function(){
		$('#conductor').css('display', 'none');
		$('#pantallaTaxiLlego').css('display', 'block');
	});
	//Esto es temporal

	$(document).on('click', '#cerrarPantallaTaxiLlego', function(){
		$('#pantallaTaxiLlego').css('display', 'none');
	});

	$(document).on('click', '#cancelarConductor', function(){
		$('#conductor').css('display', 'none');
		$('#pedirTaxi').css('display', 'block');
		$('#cerrarPedirTaxi').css('display', 'block');
	});

	$(document).on('click', '#editarPerfil', function(){
		location.href = "editar_perfil.html"
	});
});

function determinarLogeado(){
	firebase.auth().onAuthStateChanged(function(user) {
	  	if (user) {

	  		firebase.database().ref('usuarios/' + firebase.auth().currentUser.uid).once('value', function(data){
	  			$('#usuario').text(data.val().nombre);
	  		});


	 	} else {
		    // User is signed out.
		    location.href = "signup.html"
	  	}
	});
}








