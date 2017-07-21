var map;
var miUbicacion;
var centramosPrimeraVez = true;

function initMap() {
  	map = new google.maps.Map(document.getElementById('mapa'),{
      	center: {lat: 21.5088746, lng: -104.9112965},
      	zoom: 15,
        streetViewControl: false,
        mapTypeControl: false,
        disableDefaultUI: true,
      	styles: estiloMapa
  	});


    //Poner Marcador en mapa
    map.addListener('click', function(e) {
        ponerMarcador(e);
    });
}

if(navigator.geolocation){	
    //Llamamos para que aparezca el cuadro pidiendo rastrear al usuario de forma rápida
	  setGeolocation();
  
    //Ponemos temporizador para seguirlo rastreando
  	window.setInterval(function(){
        setGeolocation();
    },5000);
}else{
    // Browser doesn't support Geolocation
  	handleLocationError(false, map.getCenter());
}

function setGeolocation(){
  	navigator.geolocation.getCurrentPosition(function(position) {
      	var pos = {
        		lat: position.coords.latitude,
        		lng: position.coords.longitude
      	};

        //Solo centramos la primeva vez que encontramos al usuario
  	    if(centramosPrimeraVez == true){
    	    	map.setCenter(pos);
    	    	centramosPrimeraVez = false;
  	    }

        //Borramos la ubicación para volver a localizar al usuario
  	    if(miUbicacion != null){
      			miUbicacion.setMap(null);
    		}

        //Creamos la nueva ubicación del usuario
	      miUbicacion = new google.maps.Marker({
            position: pos,
            icon: {url: 'objetos/mapa/miUbicacion.png', scaledSize: new google.maps.Size(35, 35)},
            map: map,
      	});

    }, function() {
        handleLocationError(true, map.getCenter());
    });
  
}


function handleLocationError(browserHasGeolocation, pos) {
	console.log('Hubo un error al geolocalizar');
	// infoWindow.setPosition(pos);
	// infoWindow.setContent(browserHasGeolocation ?
  //                      'Error: The Geolocation service failed.' :
  //                      'Error: Your browser doesn\'t support geolocation.');
}