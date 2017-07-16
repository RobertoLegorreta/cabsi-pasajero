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
	var choferSeleccionado;
	$(document).on('click', '#pedirTaxi', function(){
		$('#pantallaPidiendoTaxi').css('display', 'block');
		$('#pedirTaxi').css('display', 'none');

		// var lat = marcadorActual.position.lat();
		// var lng = marcadorActual.position.lng();
		// var usuario = firebase.auth().currentUser.uid;

		// var peticion = {
		// 	userKey: usuario,
		// 	timestamp: firebase.database.ServerValue.TIMESTAMP,
		// 	ubicacionQuieroIr: {lat: marcadorActual.position.lat(), lng: marcadorActual.position.lng()},
		// 	miUbicacion: {lat: miUbicacion.position.lat(), lng: miUbicacion.position.lng()}
		// }

		// var keyPeticion = firebase.database().ref('peticiones/').push().key;

		// var actualizar = {};
		// actualizar['peticiones/' + keyPeticion] = peticion;
		// actualizar['usuarios/' + usuario + '/peticiones/' + keyPeticion] = true;

		// firebase.database().ref().update(actualizar);
	
		firebase.database().ref('ubicacionTaxi').once('value', function(data){
		
			var distancia = [];

			var latMiUbicacion = miUbicacion.position.lat();
			var longMiUbicacion = miUbicacion.position.lng();

			for(taxi in data.val()){
				getDistanceFromLatLonInKm(latMiUbicacion, longMiUbicacion, data.val()[taxi].lat, data.val()[taxi].lng, taxi);
			}
			//Area de pruebas
			//Area de pruebas
			//Area de pruebas

			function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2,taxi) {
				var R = 6371; // Radius of the earth in km
				var dLat = deg2rad(lat2-lat1);  // deg2rad below
				var dLon = deg2rad(lon2-lon1); 
				var a = 
				    Math.sin(dLat/2) * Math.sin(dLat/2) +
				    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
				    Math.sin(dLon/2) * Math.sin(dLon/2); 
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
				var d = R * c; // Distance in km
				if(d < 5){
					distancia.push([taxi, d]);
				}
			}

			function deg2rad(deg) {
			  return deg * (Math.PI/180)
			}

			//Ordenar taxistas por distancia más corta
			distancia.sort(compararSegundaColumna);

			function compararSegundaColumna(a, b) {
			    if (a[1] === b[1]) {
			        return 0;
			    }
			    else {
			        return (a[1] < b[1]) ? -1 : 1;
			    }
			}

			firebase.database().ref('choferes/' + distancia[0][0] + '/estado').once('value', function(estado){
				if(estado.val() == 'libre'){
					choferSeleccionado = distancia[0][0];
					firebase.database().ref('choferes/' + distancia[0][0] + '/estado').set('ocupado');
					firebase.database().ref('choferes/' + distancia[0][0] + '/peticion').set({
						usuario: firebase.auth().currentUser.uid,
						suUbicacion: {lat: latMiUbicacion, lng: longMiUbicacion},
						quiereIr: {lat: marcadorActual.position.lat(), lng: marcadorActual.position.lng()}
					});
				}
			});
			//Area de pruebas
			//Area de pruebas
			//Area de pruebas




		});	

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

		firebase.database().ref('choferes/' + choferSeleccionado + '/estado').set('libre');
		firebase.database().ref('choferes/' + choferSeleccionado + '/peticion').set(null);
	});

	//Esto es temporal
	$(document).on('click', '#fotoConductor', function(){
		$('#conductor').css('display', 'none');
		$('#pantallaTaxiLlego').css('display', 'block');
	});
	//Esto es temporal

	$(document).on('click', '#cerrarPantallaTaxiLlego', function(){
		$('#pantallaTaxiLlego').css('display', 'none');
	});

	$(document).on('click', '#finalizarViaje', function(){
		$('#conductor').css('display', 'none');
		$('#pedirTaxi').css('display', 'block');
		$('#cerrarPedirTaxi').css('display', 'block');

		firebase.database().ref('usuarios/' + firebase.auth().currentUser.uid + '/conductorAsignado').set(null);
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

	  		firebase.database().ref('usuarios/' + firebase.auth().currentUser.uid + '/conductorAsignado').on('value', function(snapshot){
	  			if(snapshot.val() != null){
					$('#conductor').css('display', 'block');
					$('#pantallaPidiendoTaxi').css('display', 'none');
					$('#cerrarPedirTaxi').css('display', 'none');

					firebase.database().ref('choferes/' + snapshot.val()).once('value', function(data){
						$('#nombreConductor').text(data.val().nombre);
						$('#vehiculo').text(data.val().vehiculo.modelo);
						$('#numeroTaxi').text(data.val().vehiculo.numeroTaxi);
						$('#placa').text(data.val().vehiculo.numeroPlaca);
					});
	  			}else{
	  				if($('#conductor').css('display') == 'block'){
	  					$('#conductor').css('display', 'none');
						$('#pedirTaxi').css('display', 'block');
						$('#cerrarPedirTaxi').css('display', 'block');
	  				}
	  			}
	  		});

	 	} else {
		    // User is signed out.
		    location.href = "signup.html"
	  	}
	});
}








