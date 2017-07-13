var map;
var marcadorActual; 
var miUbicacion;

function initMap() {
	map = new google.maps.Map(document.getElementById('mapa'),{
  	center: {lat: 21.5088746, lng: -104.9112965},
  	zoom: 15,
    streetViewControl: false,
    mapTypeControl: false,
    disableDefaultUI: true,
  	styles: 
  	[
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#f5f5f5"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#f5f5f5"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.land_parcel",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#bdbdbd"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#eeeeee"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#e5e5e5"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#ffffff"
		      }
		    ]
		  },
		  {
		    "featureType": "road.arterial",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#dadada"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry.fill",
		    "stylers": [
		      {
		        "color": "#a8abaf"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "featureType": "road.local",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.line",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#e5e5e5"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.station",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#eeeeee"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#c9c9c9"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  }
		]
	});//Fin de la creación del mapa

	map.addListener('click', function(e) {
    
    if($('#conductor').css('display') != 'block'){//Hace que no se pueda pedir taxi cuando ya viene un taxi en camino
		pedirTaxi();

		var pos = e.latLng;

		if(marcadorActual != null){
			marcadorActual.setMap(null);
		}

		var marker = new google.maps.Marker({
	        position: pos,
	        icon: {url: 'objetos/mapa/quieroIr.png', scaledSize: new google.maps.Size(27, 27)},
	        map: map,
	  	});	

	  	marcadorActual = marker;//Aquí contenemos la ubicación a la que el usuario quiere ir
  	}
  });
}//Fin de initMap()

var bandera = 0;

if(navigator.geolocation){	
	setGeolocation();//Llamamos para que aparezca el cuadro pidiendo rastrear al usuario de forma rápida

	window.setInterval( function () {
        setGeolocation();
    }, 
	    5000 //Ponemos temporizador para seguirlo rastreando
	);

} else {
  	// Browser doesn't support Geolocation
  	handleLocationError(false, map.getCenter());
}

function setGeolocation(){
	// Try HTML5 geolocation.   
  	navigator.geolocation.getCurrentPosition(function(position) {
    	var pos = {
      		lat: position.coords.latitude,
      		lng: position.coords.longitude
    	};

    	//console.log('Dirección actual del usuario: latitut: ' + pos.lat + ' longitud' + pos.lng);

	    if(bandera == 0){
	    	map.setCenter(pos);
	    	bandera++;
	    }

	    if(miUbicacion != null){
			miUbicacion.setMap(null);
		}

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