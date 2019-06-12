const proceedRequest = ( url, data ) => {
	return new Promise( ( resolve, reject ) => {
		const ajax = new XMLHttpRequest();
		ajax.open( 'POST', url );

		// configuration of the ajax request
		ajax.onload = () => {
			if( ajax.status == 200 ) {
				resolve( ajax.response );
			} else {
				reject( "Error on querying the server" );
			}
		}

		ajax.onerror = () => {
			reject( "Error network" );
		}

		ajax.setRequestHeader( 'Content-Type', 'application/json' );
		ajax.responseType = 'json';
		ajax.send( JSON.stringify( data ) );
	} );
}

document.addEventListener( 'DOMContentLoaded', loadedEvent => {
	const form = document.getElementById( 'form' );
	form.addEventListener( 'submit', submitEvent => {
		submitEvent.preventDefault(); // remove the reloding of the page
		// retrieve the message
		const message = {
			message: form.message.value
		};

		const now = Date.now();
		const spinner = document.getElementById( 'spinner' );
		spinner.style.visibility = 'visible';

		proceedRequest( './php/serveur.php', message )
			.then( res => {
				spinner.style.visibility = 'hidden';

				const message = res.message;
				const time = Date.now() - now;

				// create a new child on the list of messages
				const ul = document.getElementById( 'listeMessages' );
				const li = document.createElement( 'li' );
				li.innerText = message + "     " +  time + 'ms';
				ul.appendChild( li );
			} )
			.catch( error => {
				console.log( error );
			} )
	} );
} );