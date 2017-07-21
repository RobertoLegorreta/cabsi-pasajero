var choferSeleccionado;
var taxisCercanos = [];
var latMiUbicacion;
var longMiUbicacion;

function pedirTaxi(){	
	//Cada que se pide taxi limpiamos los taxis cercanos para poderlos determinar nuevamente	
	taxisCercanos = [];

	$('#pantallaPidiendoTaxi').css('display', 'block');
	$('#pedirTaxi').css('display', 'none');

	firebase.database().ref('ubicacionTaxi').once('value', function(data){
		
		//Verificamos que haya por lo menos un taxi disponible
		if(data.val() != null){
			latMiUbicacion = miUbicacion.position.lat();
			longMiUbicacion = miUbicacion.position.lng();

			for(taxi in data.val()){
				//Sacamos la distancia de cada taxi con mi ubicación actual
				getDistanceFromLatLonInKm(latMiUbicacion, longMiUbicacion, data.val()[taxi].lat, data.val()[taxi].lng, taxi);
			}

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
					taxisCercanos.push([taxi, d]);
				}
			}

			function deg2rad(deg) {
			  return deg * (Math.PI/180)
			}

			//Ordenar taxistas por distancia más corta
			taxisCercanos.sort(compararSegundaColumna);

			function compararSegundaColumna(a, b) {
			    if (a[1] === b[1]) {
			        return 0;
			    }
			    else {
			        return (a[1] < b[1]) ? -1 : 1;
			    }
			}

			pedirTaxiEnDatabase(0);
		}

	});	
}

var contador;
function pedirTaxiEnDatabase(taxi){
	if(taxi < taxisCercanos.length){
		firebase.database().ref('choferes/' + taxisCercanos[taxi][0] + '/estado').once('value', function(estado){
			if(estado.val() == 'libre'){
				choferSeleccionado = taxisCercanos[taxi][0];
				firebase.database().ref('choferes/' + taxisCercanos[taxi][0] + '/estado').set('ocupado');
				firebase.database().ref('choferes/' + taxisCercanos[taxi][0] + '/peticion').set({
					usuario: IDUsuario,
					suUbicacion: {lat: latMiUbicacion, lng: longMiUbicacion},
					quiereIr: {lat: marcadorActual.position.lat(), lng: marcadorActual.position.lng()}
				});

				if(contador != null){
					clearTimeout(contador);
				}

				contador = setTimeout(function(){
					firebase.database().ref('choferes/' + taxisCercanos[taxi][0] + '/estado').set('libre');
					firebase.database().ref('choferes/' + taxisCercanos[taxi][0] + '/peticion').set(null);

					firebase.database().ref('usuarios/' + IDUsuario + '/peticionEstado').once('value', function(data){
					if(data.val() == null){
						firebase.database().ref('usuarios/' + IDUsuario + '/peticionEstado').set(1);
					}else{
						firebase.database().ref('usuarios/' + IDUsuario + '/peticionEstado').set(data.val() + 1);
					}
				});
				}, 8000);

			}else{
				firebase.database().ref('usuarios/' + IDUsuario + '/peticionEstado').once('value', function(data){
					if(data.val() == null){
						firebase.database().ref('usuarios/' + IDUsuario + '/peticionEstado').set(1);
					}else{
						firebase.database().ref('usuarios/' + IDUsuario + '/peticionEstado').set(data.val() + 1);
					}
				});
			}
		});
	}else{
		cancelarPeticion();
		alert('Lo sentimos, no hay taxis disponibles en este momento');
	}
}

function cancelarPeticion(){
	$('#pantallaPidiendoTaxi').css('display', 'none');
	$('#pedirTaxi').css('display', 'block');

	firebase.database().ref('choferes/' + choferSeleccionado + '/estado').set('libre');
	firebase.database().ref('choferes/' + choferSeleccionado + '/peticion').set(null);
	firebase.database().ref('usuarios/' + IDUsuario + '/peticionEstado').set(null);
}