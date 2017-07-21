function determinarLogeado(){
	if (firebase.auth().currentUser){
  		location.href = "index.html";
 	} else {
	    // User is signed out.
  	}
}

