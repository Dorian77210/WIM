const BASE_URL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=code-postal-code-insee-2015@public&q=code_postal:{code}&facet=nom_reg&facet=code_dept&facet=nom_dept&facet=statut&facet=insee_com";

const proceedRequest = ( url ) => {
	return new Promise( ( resolve, reject ) => {
		const ajax = new XMLHttpRequest();

		ajax.onload = () => {
			if(ajax.status == 200) {
				resolve( ajax.response );
			} else {
				reject( "Error when fetching the data" );
			}
		}

		ajax.onerror = () => {
			reject( "Network error" );
		}

		ajax.open( 'GET', url );
		ajax.responseType = 'json';
		ajax.send( null );
	} );
}

document.addEventListener( 'DOMContentLoaded', loadedEvent => {
	const form = document.forms[0];
	const input = form.codep;

	input.addEventListener( 'input', submitEvent => {
		const code = form.codep.value;
		const url = BASE_URL.replace( '{code}', code );
		var dep = null;
		const errorDiv = document.getElementById( 'nt' );
		const spinner = document.getElementById( 'spinner' );

		if(code.length == 5) {
			spinner.style.visibility = 'visible';
			proceedRequest( url )
				.then( res => {
					spinner.style.visibility = 'hidden';
					if( errorDiv.style.display = 'block' ) {
						errorDiv.style.display = 'none';
					}

					const select = document.querySelector( 'select' );
					select.innerHTML = "";

					// proceed the data
					const records = res.records;
					records.forEach( record => {
						const fields = record.fields;
						const city = fields.nom_com;

						const option = document.createElement( 'option' );
						option.innerText = city;
						select.appendChild( option );

						if(!dep) {
							dep = fields.nom_dept;
							const depInput = document.getElementById( 'departement' );
							depInput.value = dep;
						}
					} );
				} )	
				.catch( error => {
					spinner.style.visibility = 'hidden';
					errorDiv.style.display = 'block';
					errorDiv.innerText = error;
				} );
		}
	} );
} );