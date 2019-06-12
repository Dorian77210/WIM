const MIN = 1;
const MAX = 100;

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener( 'DOMContentLoaded', loadedEvent => {
	// generate the random numbers for the cases
	const startDiv = document.getElementById( 'start' );
	const endDiv = document.getElementById( 'end' );

	const cells = startDiv.querySelectorAll( '.drag' );
	cells.forEach( cell => {
		cell.innerText = getRandomInt(MIN, MAX);
	} );

	endDiv.ondragover = ( dragEvent ) => {
		dragEvent.preventDefault();
	}

	startDiv.ondragstart = ( dragEvent ) => {
		dragEvent.dataTransfer.setData( 'id', dragEvent.target.id );
	}

	endDiv.ondrop = ( dropEvent ) => {
		dropEvent.preventDefault();
		const id = dropEvent.dataTransfer.getData( 'id' );
		const div = document.getElementById( id );

		const target = dropEvent.target;
		target.appendChild( div );

		checkOrder();
	}
} );

const checkOrder = () => {
	const endDiv = document.getElementById( 'end' );
	const cells = endDiv.querySelectorAll( '.drag' );

	var order = true; // default value
	var previousValue = null, currentValue = null;
	cells.forEach( cell => {
		if(!previousValue) {
			previousValue = parseInt(cell.innerText);
		}

		currentValue = parseInt(cell.innerText);

		if(previousValue > currentValue) {
			order = false;
			if( endDiv.classList.contains( 'good' ) ) {
				endDiv.classList.remove( 'good' );
			}

			if( !endDiv.classList.contains( 'wrong' ) ) {
				endDiv.classList.add( 'wrong' );
			}

			return;
		} else {
			order = true;
		}
	} );

	if(order) {
		if( endDiv.classList.contains( 'wrong' ) ) {
			endDiv.classList.remove( 'wrong' );
		}

		if( !endDiv.classList.contains( 'good' ) ) {
			endDiv.classList.add( 'good' );
		}
	}
}