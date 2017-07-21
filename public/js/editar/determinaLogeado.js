var IDUsuario; 
function determinarLogeado(){
	firebase.auth().onAuthStateChanged(function(user){
	  	if(user){
	  		IDUsuario = user.uid;
	  		cargarInformacion();
	 	}else{
		    location.href = "signup.html"
	  	}
	});
}