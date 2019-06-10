document.addEventListener( 'DOMContentLoaded', loadedEvent => {
	const body = document.body;
	// create container for the children
	const container = document.createElement( 'div' );
	container.setAttribute( 'id', 'container' );
	body.appendChild( container );


	// add a listener for the add button
	const addChildrenButton = document.querySelector( 'button' );
	addChildrenButton.addEventListener( 'click', clickEvent => {
		clickEvent.preventDefault();
		const select = document.getElementById( 'enfant' );
		const optionSelected = select.selectedOptions[0];
		const wantedChildren = parseInt( optionSelected.value );
		container.innerHTML = "";

		for( let i = 0; i < wantedChildren; i++ ) {
			const div = createChild( i + 1 );
			container.appendChild( div );
		}
	} );
} );

const createChild = ( index ) => {
	const div = document.createElement( 'div' );
	const label = document.createElement( 'label' );
	const input = document.createElement( 'input' );

	label.innerText = "Prénom enfant " + index;
	input.setAttribute( 'name', 'children[]' );
	input.setAttribute( 'type', 'text' );

	div.appendChild( label );
	div.appendChild( input );

	return div;
}