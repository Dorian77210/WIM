document.addEventListener( 'DOMContentLoaded', loadedEvent => {
	// elements 
	const form = document.getElementById( 'form' );
	const table = document.getElementById( 'contacts' );
	const tbody = table.querySelector( 'tbody' );


	// add event when the user click on add
	const addPersonButton = document.getElementById( 'ajouter' );

	addPersonButton.addEventListener( 'click', clickEvent => {
		// retrieve information about the new user
		const lastName = form.nom.value;
		const firstName = form.prenom.value;
		const email = form.email.value;

		const user = {
			lastName: lastName,
			firstName: firstName,
			email: email
		};

		addUser( tbody, user );
	} );

	// add event when user click on the table
	tbody.addEventListener( 'click', clickEvent => {
		const target = clickEvent.target; // td element
		const row = target.parentNode;
		tbody.removeChild( row );
	} );

	// add event when user click on the save button
	const saveButton = document.getElementById( 'sauver' );
	saveButton.addEventListener( 'click', clickEvent => {
		// retrieve all information about the users include in the table
		const users = [];
		const rows = tbody.querySelectorAll( 'tr' );
		rows.forEach( row => {
			const cols = row.querySelectorAll( 'td' );
			const user = {
				lastName: cols[0].innerText,
				firstName: cols[1].innerText,
				email: cols[2].innerText,
			};
			users.push( user );
		} );

		const data = { users: users };
		localStorage[ 'users' ] = JSON.stringify( data );
	} );

	// if the local storage exists, the users will be displayed
	if( localStorage[ 'users' ] ) {
		const users = JSON.parse( localStorage[ 'users' ] );
		users.users.forEach( user => {
			addUser( tbody, user );
		} );
	}
} );

const addUser = ( tbody, user ) => {
	// create new row
	const row = document.createElement( 'tr' );

	// create the cols
	const lastNameCol = document.createElement( 'td' ),
		firstNameCol = document.createElement( 'td' ),
		emailCol = document.createElement( 'td' );

	lastNameCol.innerText = user.lastName;
	firstNameCol.innerText = user.firstName;
	emailCol.innerText = user.email;

	// append the col on the row
	row.appendChild( lastNameCol );
	row.appendChild( firstNameCol );
	row.appendChild( emailCol );

	// append the row on the table
	tbody.appendChild( row );
}