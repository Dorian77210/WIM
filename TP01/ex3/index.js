const NUMBER_INPUTS = 7;

document.addEventListener( 'DOMContentLoaded', loadeEvent => {
	// add the inputs for the IBAN
	const form = document.querySelector( 'form' );
	for( let i = 1; i <= NUMBER_INPUTS; i++ ) {
		const input = document.createElement( 'input' );
		const stringLenghtLimit = ( i == NUMBER_INPUTS ) ? 3 : 4;

		input.setAttribute( 'type', 'text' );
		input.setAttribute( 'data-limit', stringLenghtLimit );
		form.appendChild( input );
	}

	// add a input listener for the form
	form.addEventListener( 'input', inputEvent => {
		const target = inputEvent.target;
		const limit = target.getAttribute( 'data-limit' );
		const length = target.value.length;
		if( length == limit ) {
			const sibling = target.nextSibling;
			if( sibling ) {
				sibling.focus();
			}
		}
	} );
} );