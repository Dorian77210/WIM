const request = ( url, data ) => {
	return new Promise( ( resolve, reject ) => {
		const ajax = new XMLHttpRequest();

		// setup the listeners for the ajax object
		ajax.onload = () => {
			if( ajax.status == 200 ) {
				resolve( ajax.response );
			} else {
				reject( "Error when querying the url : " + url );
			}
		}

		ajax.onerror = () => {
			reject( "Error network" );
		}


		ajax.open( 'POST', url );
		ajax.setRequestHeader( 'Content-Type', 'application/json' );
		ajax.responseType = 'json';
		const jsonData = JSON.stringify( data );
		ajax.send( jsonData );
	} );
}

const makeServiceAjax = () => {
	return {
		request: request,
		SERVER_URL: './php/serveur.php',
	};
}