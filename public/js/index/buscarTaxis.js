function buscarTaxis(){
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
}