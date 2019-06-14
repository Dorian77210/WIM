const makeAjaxRequest = ( url ) => {
	return new Promise( ( resolve, reject ) => {
		const ajax = new XMLHttpRequest();

		ajax.onload = () => {
			if( ajax.status == 200 ) {
				resolve( ajax.response );
			} else {
				reject( "Error when querying the url " + url );
			}
		}

		ajax.onerror = () => {
			reject( "Network error" );
		}

		ajax.open( 'GET', url );
		ajax.responseType = "json";
		ajax.send( null );
	} );
}


const retrieveAjaxService = () => {
	return {
		initURL: 'http://www.iut-fbleau.fr/controle/wim41/init',
		isInURL: 'http://www.iut-fbleau.fr/controle/wim41/is_in/',
		request: makeAjaxRequest
	};
}